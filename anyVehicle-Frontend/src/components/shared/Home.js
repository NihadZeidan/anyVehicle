// my context
import React, { useContext } from "react";
import { myContext } from "../../context/context";
import useStyles from "../../Styles/homeStyles";

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
  const { user, token } = useContext(myContext);
  const classes = useStyles();
  return (
    <div>
      {token ? (
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
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                I've got a very good service recently !
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
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                After two months of searching, finally I found who can fix old
                beloved cars !
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
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams
                </Typography>
                HIGHLY RECOMMENDED! excellent service with reasonable price
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}

export default Home;
