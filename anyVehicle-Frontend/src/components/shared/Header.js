import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { myContext } from "../../context/context";
import reactCookie from "react-cookies";

// import header styles
import useStyles from "../../Styles/headerStyles.js";

function Header() {
  const classes = useStyles();
  const { setUser, user } = useContext(myContext);

  // To navigate between components
  const history = useHistory();

  // To logout, clear the token and return the user state to empty
  const handleLogout = () => {
    setUser({});

    // To refresh the <header /> whenever the user changed (logged-in or logged-out)
    reactCookie.remove("token");
    // go back to login page
    history.replace("/login");
  };

  if (user.accessControl === "admin") {
    return (
      <React.Fragment>
        <header className={classes.header}>
          <img src="assets/logo.png" alt="logo" className={classes.img} />
          <ul className={classes.list}>
            <Link to="/" className={classes.link}>
              Home
            </Link>

            <Link to="/chart" className={classes.link}>
              Insights
            </Link>
            <Link to="/editReq" className={classes.link}>
              Edit Requests
            </Link>
            <div onClick={handleLogout} className={classes.link}>
              Logout
            </div>
          </ul>
        </header>
      </React.Fragment>
    );
  } else if (user.accessControl === "customer") {
    return (
      <React.Fragment>
        <header className={classes.header}>
          <img src="assets/logo.png" alt="logo" className={classes.img} />
          <ul className={classes.list}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/allMyReq" className={classes.link}>
              My Requests
            </Link>
            <Link to="/sendReq" className={classes.link}>
              Send Maintenance Request
            </Link>
            <div onClick={handleLogout} className={classes.link}>
              Logout
            </div>
          </ul>
        </header>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <header className={classes.header}>
          <img src="assets/logo.png" alt="logo" className={classes.img} />
          <ul className={classes.list}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          </ul>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
