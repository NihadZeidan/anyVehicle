import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { myContext } from "../../context/context";

// import header styles
import useStyles from "../../Styles/headerStyles.js";

function Header() {
  const classes = useStyles();
  const { setUser, token, setToken } = useContext(myContext);

  // To navigate between components
  const history = useHistory();

  // To logout, clear the token and return the user state to empty
  const handleLogout = () => {
    setUser({});

    // To refresh the <header /> whenever the user changed (logged-in or logged-out)
    setToken(null);
    // go back to login page
    history.replace("/login");
  };

  return (
    <header className={classes.header}>
      <img src="assets/logo.png" alt="logo" className={classes.img} />
      <ul className={classes.list}>
        {/* Check if the user logged-in ? */}
        {token ? (
          <React.Fragment>
            <Link to="/" className={classes.link}>
              Home
            </Link>

            <Link to="/chart" className={classes.link}>
              Insights
            </Link>
            <Link to="/editReq" className={classes.link}>
              Edit Requests
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          </React.Fragment>
        )}
      </ul>
    </header>
  );
}

export default Header;
