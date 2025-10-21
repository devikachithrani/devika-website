import { title } from "theme/jss/material-kit-react/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";

const newsItemStyle = makeStyles({
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  newsContainer: (props) => ({
    margin: "0 auto",
    "&:nth-of-type(even)": {
      background: "#e0e0e0",
    },
  }),
  news: {
    textAlign: "left",
    bottom: "10px",
    color: "#000",
    display: "block",
    fontWeight: 400,
    marginTop: "20px",
    marginBottom: "20px",
    position: "relative",
    width: "100%",
  },
  date: {
    position: "relative",
    top: "25%",
  },
});

export default newsItemStyle;
