import React, { useContext, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import superAgent from "superagent";
import reactCookie from "react-cookies";
// my context
import { myContext } from "../../context/context";

// Login form styles
import useStyles from "../../Styles/loginStyles";

function Login() {
  //   Use the global state from my context
  const { setAccessControl, setUser, password, setPassword, email, setEmail } =
    useContext(myContext);

  // On component did mount clear the state
  useEffect(() => {
    setPassword("");
    setEmail("");
    setAccessControl(null);
  }, []);

  const history = useHistory();
  const classes = useStyles();

  //   To handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();

    let data = {
      password,
      email,
    };

    // Sending the POST request to the server
    superAgent
      .post("http://localhost:3030/login")
      .set({ "Content-Type": "application/json", Accept: "application/json" })
      .send(JSON.stringify(data))
      .then((response) => {
        // Save the user and the token
        setUser(response.body.user);
        setAccessControl(response.body.user.accessControl);

        reactCookie.save("token", response.body.token);
        e.target.reset();
        history.replace("/");
      })
      .catch((e) => console.error(e));
  };

  //   Display
  return (
    <div className={classes.root}>
      <Paper elevation={15}>
        <form onSubmit={handleLogin} className={classes.form} noValidate>
          <Typography className={classes.title}>Login Form</Typography>

          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={classes.input}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={classes.input}
          />
          <Button variant="outlined" type="submit" className={classes.btn}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
