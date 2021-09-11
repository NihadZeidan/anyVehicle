import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  root: {
    fontSize: ".8em",
    display: "flex",
    width: "20%",
    backgroundColor: "#F2841F",
    margin: "1%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default useStyles;
