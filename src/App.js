import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Courses from "./scenes/courses";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./components/auth/Login";
import Instructors from "./scenes/instrcutors";
import { useEffect } from "react";
import { useCallback } from "react";
import { AuthContext } from "./components/context/auth";
let logoutTimer;
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpDate, setTokenExpDate] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token, experationDate=null) => {
    setToken(token);
    const tokenExpDate =
      experationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpDate(tokenExpDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        tokenExpDate: tokenExpDate,
      })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpDate(null);
    setUserId(null);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.tokenExpDate) > new Date()
    ) {
      login(userData.userId, userData.token, userData.tokenExpDate);
    } else {
      localStorage.clear();
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime =new Date (tokenExpDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpDate, logout]);

  return (
    <>
      {token ? (
        <AuthContext.Provider
          value={{ isLoggedIn: !!token, token, userId, login, logout }}
        >
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/instructors" element={<Instructors />} />
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </AuthContext.Provider>
      ) : (
        <AuthContext.Provider
          value={{ isLoggedIn: !!token, token, userId, login, logout }}
        >
          <Login />
        </AuthContext.Provider>
      )}
    </>
  );
}

export default App;
