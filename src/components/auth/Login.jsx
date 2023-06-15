import { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import makeStyles from "@emotion/styled";
import axios from "axios";

import { useContext } from "react";
import { AuthContext } from "../context/auth";


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
  const { login,isLoggedIn } = useContext(AuthContext);
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let responseData;
  try {
      responseData = await axios.post("http://localhost:3000/api/admin/login",{
        username: email,
        password: password,
      });
      login(responseData.data.user._id, responseData.data.token);
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }

  };

  return (
    <Box className={classes.container}>
      <div className={classes.form}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
            onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="button"
              className={classes.submitButton}
            >
              Log In
            </Button>
          </Grid>
          {error && <p>{error}</p>}
        </Grid>
      </div>
    </Box>
  );
}

export default Login;
