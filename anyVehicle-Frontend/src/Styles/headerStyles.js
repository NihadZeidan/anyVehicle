import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
  },
  link: {
    color: "#FFFFF",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
  },
}));
export default useStyles;
