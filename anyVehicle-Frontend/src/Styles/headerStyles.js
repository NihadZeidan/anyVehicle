import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#252525",
    height: "5%",
  },
  img: {
    width: 200,
    height: 120,
    marginLeft: 20,
  },
  list: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: "auto",
    display: "flex",
  },
  link: {
    fontSize: 20,
    color: "#F3841F",
    margin: 30,
    cursor: "pointer",
    textDecoration: "none",
  },
}));

export default useStyles;
