import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";

import superAgent from "superagent";
import { myContext } from "../../context/context";
import useStyles from "../../Styles/editRequestStyles";

function EditRequests() {
  const { newStatus, setNewStatus, allRequests, setAllRequests, token } =
    useContext(myContext);

  // this variable to prevent render useEffect at the first initialization
  const isMounted = useRef(false);

  // When component did mount get all the requests from the Database
  useEffect(() => {
    superAgent
      .get("http://localhost:3030/all-requests")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .then((response) => {
        console.log(response.body);
        setAllRequests(response.body);
      })
      .catch((e) => console.error(e));
  }, []);

  // Whenever the state of the request updated, trigger the server to change it in the Database
  useEffect(() => {
    // This if statement to prevent sending the request in the first component initialization
    if (isMounted.current) {
      superAgent
        .post("http://localhost:3030/edit-request")
        .set({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        })
        .send(newStatus)
        .then((response) => {
          handleOpen();
        })
        .catch((e) => console.error(e));
    } else {
      isMounted.current = true;
    }
  }, [newStatus]);

  // Styles
  const classes = useStyles();

  // To handle Modal opening and closing
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      {allRequests.map((req, idx) => {
        return (
          <React.Fragment>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {req.requestTitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Current Status: {req.requestStatus}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Car Model: {req.carModel}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Customer Location: {req.userLocation}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {JSON.parse(req.urgent) ? "Urgent" : "Not Urgent"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Details: {req.requestDetails}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  onClick={(e) =>
                    setNewStatus({
                      requestID: req._id,
                      newStatus: "Pending",
                    })
                  }
                >
                  Pending
                </Button>
                <Button
                  size="small"
                  onClick={(e) =>
                    setNewStatus({
                      requestID: req._id,
                      newStatus: "Accepted",
                    })
                  }
                  color="primary"
                >
                  Accepted
                </Button>
                <Button
                  size="small"
                  onClick={(e) =>
                    setNewStatus({
                      requestID: req._id,
                      newStatus: "Dismissed",
                    })
                  }
                  color="secondary"
                >
                  Dismissed
                </Button>
              </CardActions>
            </Card>
            {/* Display Modal */}
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">Edited Successfully </h2>
                    <p id="transition-modal-description">
                      The maintenance Request has been updated successfully
                    </p>
                  </div>
                </Fade>
              </Modal>
            </div>
          </React.Fragment>
        );
      })}
      ;
    </div>
  );
}

export default EditRequests;
