import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { myContext } from "../../context/context";

import useStyles from "../../Styles/headerStyles.js";
import reactCookie from "react-cookies";

function Header() {
  const classes = useStyles();
  const { setUser } = useContext(myContext);

  // To navigate between components
  const history = useHistory();

  // To check if the user logged in or not (by checking the token)
  let isTheUserLoggedIn = reactCookie.load("token");

  // To logout, clear the token and return the user state to empty
  const handleLogout = () => {
    reactCookie.remove("token");
    setUser({});
    // To refresh the <header /> whenever the user changed (logged-in or logged-out)
    isTheUserLoggedIn = reactCookie.load("token");
    history.replace("/login");
  };

  return (
    <header>
      <img src="assets/logo.png" alt="" />
      <ul className={classes.link}>
        {/* Check if the user logged-in ? */}
        {!isTheUserLoggedIn ? (
          <React.Fragment>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/">Home</Link>
            <Link to="/allMyReq">My Requests</Link>
            <Link to="/sendReq">Send Maintenance Request</Link>

            <Link to="/chart">Insights</Link>
            <Link to="/editReq">Edit Requests</Link>
            <div onClick={handleLogout}>Logout</div>
          </React.Fragment>
        )}
      </ul>
    </header>
  );
}

export default Header;
