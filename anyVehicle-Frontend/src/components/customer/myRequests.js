import React, { useContext, useEffect } from "react";
import { myContext } from "../../context/context";
import superAgent from "superagent";
import reactCookie from "react-cookies";

// Accordion Components
import { Card, Typography } from "@material-ui/core";

// Styles
import useStyles from "../../Styles/myRequestsStyles";

function MyRequests() {
  const classes = useStyles();

  const { userRequests, setUserRequests } = useContext(myContext);

  // When component did mount get all user requests from the server
  useEffect(() => {
    superAgent
      .get("https://any-vehicle-backend.herokuapp.com/all-user-requests")
      //   User must be authorized
      .set({ Authorization: `Bearer ${reactCookie.load("token")}` })
      .then((response) => {
        setUserRequests(response.body);
      })
      .catch((e) => console.error(e));
  }, []);

  //   Display
  return (
    <div className={classes.container}>
      {userRequests.map((req, idx) => {
        return (
          <React.Fragment>
            <Card className={classes.root}>
              <Typography
                variant="inherit"
                color="textSecondary"
                component="h2"
              >
                Status: {req.requestStatus}
                <br />
                Car Model: {req.carModel}
                <br />
                Location: {req.userLocation}
                <hr />
              </Typography>

              <Typography
                variant="inherit"
                color="textSecondary"
                component="h2"
              >
                Request Description: &nbsp;
                {req.requestDetails}
              </Typography>
            </Card>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default MyRequests;
