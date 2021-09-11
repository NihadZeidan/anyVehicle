import { Link } from "react-router-dom";
import useStyles from "../../Styles/headerStyles.js";

import React, { useContext, useEffect } from "react";
import { myContext } from "../../context/context";

import reactCookie from "react-cookies";

function Header() {
  const classes = useStyles();

  const { user } = useContext(myContext);
  return (
    <header>
      <img src="anyVehicle-Frontend/public/assets/logo.png" alt="" />
      <ul className={classes.link}>
        {/* Check if the user registered ? */}
        {!reactCookie.load("token") ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {/* Check if the user is customer or admin */}
            {user.accessControl === "customer" ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/allMyReq">My Requests</Link>
                <Link to="/sendReq">Send Maintenance Request</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/chart">Insights</Link>
                <Link to="/editReq">Edit Requests</Link>
              </>
            )}
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
