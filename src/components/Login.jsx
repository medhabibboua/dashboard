import { useState } from "react";
import {TextField,Button,Grid,Box,Typography} from "@mui/material";
import makeStyles from "@emotion/styled";
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

function Login({setIsLoggedIn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email and password
    if (email === "admin@example.com" && password === "password123") {
      setIsLoggedIn(true);
    } else {
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
              type="email"
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
              Log In
            </Button>
          </Grid>
          
      {error && <p>{error}</p>}
      </Grid>
    </form>

    </Box>
  );
}

export default Login;