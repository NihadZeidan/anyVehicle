import React, { useContext } from "react";
import {
  InputLabel,
  Select,
  Typography,
  Checkbox,
  Paper,
  Button,
  TextField,
  FormControlLabel,
} from "@material-ui/core";
import superAgent from "superagent";
import { useHistory } from "react-router-dom";
import reactCookie from "react-cookies";

// Import styles
import useStyles from "../../Styles/registerStyles";

// my context
import { myContext } from "../../context/context";

function SendRequest() {
  const history = useHistory();
  const classes = useStyles();

  // Use global state
  const {
    reqTitle,
    setReqTitle,
    reqDescription,
    setReqDescription,
    urgent,
    setUrgent,
    userLocation,
    setUserLocation,
    carModel,
    setCarModel,
  } = useContext(myContext);

  //   Handle sending maintenance request
  const handelSubmit = async (e) => {
    e.preventDefault();

    let data = {
      requestTitle: reqTitle,
      requestDetails: reqDescription,
      urgent: urgent,
      userLocation: userLocation,
      carModel: carModel,
    };

    // Sending to the server
    superAgent
      .post("http://localhost:3030/send-request")
      .set({
        Authorization: `Bearer ${reactCookie.load("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .send(JSON.stringify(data))
      .then((response) => {
        e.target.reset();
        history.push("/");
      })
      .catch((e) => console.error(e));
  };

  //   Display
  return (
    <div className={classes.root}>
      <Paper elevation={15}>
        <form onSubmit={handelSubmit} className={classes.form}>
          <Typography className={classes.title}>Maintenance Request</Typography>
          <TextField
            type="text"
            label="Request Title"
            variant="outlined"
            className={classes.input}
            value={reqTitle}
            onChange={(event) => setReqTitle(event.target.value)}
          />

          <TextField
            type="text"
            multiline
            variant="outlined"
            label="Request Description"
            className={classes.input}
            value={reqDescription}
            onChange={(event) => setReqDescription(event.target.value)}
          />

          <InputLabel htmlFor="location" className={classes.label}>
            Your Location
          </InputLabel>
          <Select
            className={classes.input}
            native
            variant="outlined"
            name="location"
            value={userLocation}
            onChange={(event) => setUserLocation(event.target.value)}
            inputProps={{
              name: "location",
            }}
          >
            <option aria-label="None" value="" />
            <option value="Amman">Amman</option>
            <option value="Irbid">Irbid</option>
            <option value="Zarqa">Zarqa</option>
            <option value="Madaba">Madaba</option>
            <option value="Salt">Salt</option>
          </Select>

          <InputLabel htmlFor="carModel" className={classes.label}>
            Your Car Model
          </InputLabel>
          <Select
            className={classes.input}
            native
            variant="outlined"
            name="carModel"
            value={carModel}
            onChange={(event) => setCarModel(event.target.value)}
            inputProps={{
              name: "carModel",
            }}
          >
            <option aria-label="None" value="" />
            <option value="Mercedes">Mercedes</option>
            <option value="VolksWagen">VolksWagen</option>
            <option value="BMW">BMW</option>
            <option value="Tesla">Tesla</option>
          </Select>

          <FormControlLabel
            className={classes.checkbox}
            value={urgent}
            label="Urgent?"
            labelPlacement="start"
            control={<Checkbox color="primary" />}
            onChange={(event) => setUrgent(!urgent)}
          />

          <Button variant="outlined" type="submit" className={classes.btn}>
            Send Request
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SendRequest;
