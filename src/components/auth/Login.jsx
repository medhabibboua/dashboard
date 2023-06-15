import { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import makeStyles from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useEffect } from "react";
import ClassicLoader from "../loader/loader";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    maxWidth: 400
  },
  submitButton: {
    marginTop: 16
  },
  errorMessage: {
    color: "red",
    marginTop: 16
  }
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const classes = useStyles();
  const [isLoading,setIsLoading]=useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    //let responseData;
    try {
      setIsLoading(true)
      const responseData = await axios.post("http://127.0.0.1:3000/api/admin/login", {
        username: "laziz",
        password: "123"
      });
      console.log(responseData.headers);
      login(responseData.data.user._id, responseData.data.token);
      navigate("/");
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <Box className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
             {isLoading ?<ClassicLoader type="white"/>:"LogIn"}
            </Button>
          </Grid>
          {error && <p>{error}</p>}
        </Grid>
      </form>
    </Box>
  );
}

export default Login;
