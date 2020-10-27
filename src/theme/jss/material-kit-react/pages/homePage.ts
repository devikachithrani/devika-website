import {
  container,
  title,
} from "theme/jss/material-kit-react/material-kit-react";

import { makeStyles } from "@material-ui/core/styles";

const landingPageStyle = makeStyles({
  container: {
    zIndex: 12,
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    "@media screen and (orientation:landscape) and (max-height: 500px)": {
      display: "none"
    },
    "@media screen and (max-width: 480px)": {
      fontSize: "5.5vh"
    },
    "@media screen and (max-width: 576px)": {
      fontSize: "6.5vh"
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "5.5vh"
    },
    "@media screen and (max-width: 992px)": {
      fontSize: "4.5vh"
    },
    "@media screen and (max-width: 1200px)": {
      fontSize: "3.5vh"
    },
    
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: 3,
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
});

export default landingPageStyle;
