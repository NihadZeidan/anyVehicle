import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import superAgent from "superagent";

// Import all the needed components
import {
  Typography,
  Paper,
  TextField,
  Button,
  Select,
  InputLabel,
} from "@material-ui/core";

// Import styles
import useStyles from "../../Styles/registerStyles";

// my context
import { myContext } from "../../context/context";

function Register() {
  // history to navigate to another component
  const history = useHistory();
  const classes = useStyles();

  //   Use the global state from my context
  const {
    password,
    setPassword,
    email,
    setEmail,
    userName,
    setUserName,
    accessControl,
    setAccessControl,
  } = useContext(myContext);

  // On component did mount clear the state
  useEffect(() => {
    setPassword("");
    setEmail("");
    setAccessControl(null);
    setUserName("");
  }, []);

  //   Handle Submitting the Form
  const handelSubmit = async (e) => {
    e.preventDefault();

    let data = {
      email,
      password,
      userName,
      accessControl,
    };

    // Sending the POST request to the server
    superAgent
      .post("https://any-vehicle-backend.herokuapp.com/register")
      .set({ "Content-Type": "application/json", Accept: "application/json" })
      .send(JSON.stringify(data))
      .then((response) => {
        e.target.reset();
        history.push("/login");
      })
      .catch((e) => console.error(e));
  };

  //   Display
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper elevation={15}>
          <form onSubmit={handelSubmit} className={classes.form}>
            <Typography className={classes.title}>Registration Form</Typography>
            <TextField
              type="text"
              name="userName"
              label="User Name"
              className={classes.input}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />

            <TextField
              type="password"
              name="password"
              label="Password"
              className={classes.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <TextField
              type="email"
              name="email"
              label="Email"
              className={classes.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputLabel htmlFor="registerAs" className={classes.label}>
              Register As
            </InputLabel>
            <Select
              className={classes.input}
              native
              name="accessControl"
              value={accessControl}
              onChange={(event) => setAccessControl(event.target.value)}
              inputProps={{
                name: "registerAs",
              }}
            >
              <option aria-label="None" value="" />
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </Select>

            <Button variant="outlined" type="submit" className={classes.btn}>
              Register
            </Button>
          </form>
        </Paper>
      </div>
    </React.Fragment>
  );
}
export default Register;
