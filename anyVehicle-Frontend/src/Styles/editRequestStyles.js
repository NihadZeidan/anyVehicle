import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "inline-block",
  },
  paper: {
    backgroundColor: "#9D9D9E",
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default useStyles;
