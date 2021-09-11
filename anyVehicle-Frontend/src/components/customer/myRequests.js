import React, { useContext, useEffect } from "react";
import { myContext } from "../../context/context";
import superAgent from "superagent";
import reactCookie from "react-cookies";

// Accordion Components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "../../Styles/myRequestsStyles";

function MyRequests() {
  const classes = useStyles();

  //   To toggle the card
  // const [expanded, setExpanded] = React.useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const { userRequests, setUserRequests } = useContext(myContext);

  // When component did mount get all user requests from the server
  useEffect(() => {
    superAgent
      .get("http://localhost:3030/all-user-requests")
      //   User must be authorized
      .set({ Authorization: `Bearer ${reactCookie.load("token")}` })
      .then((response) => {
        setUserRequests(response.body);
      })
      .catch((e) => console.error(e));
  }, []);

  //   Display
  return userRequests.map((req, idx) => {
    return (
      <div className={classes.container} key={idx}>
        <Accordion className={classes.root}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="inherit" color="textSecondary" component="h2">
              Status: {req.requestStatus}
              <br />
              Car Model: {req.carModel}
              <br />
              Location: {req.userLocation}
              <hr />
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="inherit" color="textSecondary" component="p">
              Request Description: &nbsp;
              {req.requestDetails}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  });
}

export default MyRequests;
