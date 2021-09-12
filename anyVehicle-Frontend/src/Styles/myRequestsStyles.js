import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
  },
  root: {
    fontSize: ".8em",
    width: "30%",
    backgroundColor: "#F2841F",
    margin: "1%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default useStyles;
