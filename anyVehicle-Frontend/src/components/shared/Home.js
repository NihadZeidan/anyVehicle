// my context
import React, { useContext } from "react";
import { myContext } from "../../context/context";
import useStyles from "../../Styles/homeStyles";
import reactCookie from "react-cookies";

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";

function Home() {
  const { user } = useContext(myContext);

  // Styles
  const classes = useStyles();

  // Display
  return (
    <div>
      {reactCookie.load("token") ? (
        <Typography className={classes.welcome}>
          {" "}
          Welcome {user.userName}
        </Typography>
      ) : null}

      <Typography component="h5" className={classes.intro} color="textPrimary">
        Any Vehicle, where you can request car maintenance in an easy and fast
        way !
      </Typography>

      <Typography
        component="h5"
        className={classes.reviews}
        color="textPrimary"
      >
        Reviews !
      </Typography>

      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Do not hastate to try their services !!"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors &nbsp;
                </Typography>
                <p> I've got a very good service recently ! </p>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Simply AWESOME SERVICE !"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Scott Jennifer &nbsp;
                </Typography>
                <p>
                  {" "}
                  After two months of searching, finally I found who can fix old
                  beloved cars !
                </p>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="The best..."
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams &nbsp;
                </Typography>
                <p>
                  HIGHLY RECOMMENDED! excellent service with reasonable price
                </p>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}

export default Home;
