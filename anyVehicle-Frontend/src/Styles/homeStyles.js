import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    // maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2%",
  },
  inline: {
    display: "inline",
  },
  welcome: {
    textAlign: "center",
    fontSize: "1em",
    color: "#FFFFFF",
  },
  intro: {
    color: "#FFFFFF",
    marginTop: 50,
    textAlign: "center",
    fontSize: "2em",
  },
  reviews: {
    color: "#F3841F",
    textAlign: "center",
    fontSize: "2em",
  },
}));

export default useStyles;
