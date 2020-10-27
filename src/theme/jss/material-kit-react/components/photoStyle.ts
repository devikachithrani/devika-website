import { makeStyles } from "@material-ui/core/styles";

import {
  container,
  title,
  cardTitle,
} from "theme/jss/material-kit-react/material-kit-react";

const useStyles = makeStyles({
  container: {
    color: "#FFFFFF",
    ...container,
  },
  cardTitle,
  smallTitle: {
    color: "#6c757d",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    "@media screen and (orientation:landscape) and (max-height: 500px)": {
      display: "none",
    },
    "@media screen and (max-width: 480px)": {
      fontSize: "5.5vh",
    },
    "@media screen and (max-width: 576px)": {
      fontSize: "6.5vh",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "5.5vh",
    },
    "@media screen and (max-width: 992px)": {
      fontSize: "4.5vh",
    },
    "@media screen and (max-width: 1200px)": {
      fontSize: "3.5vh",
    },
  },
  image: {
    marginTop: "8px",
    verticalAlign: "middle",
    width: "100%",
  },
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  imgRounded: {
    borderRadius: "6px !important",
  },
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  description: {
    color: "#999",
  },
});

export default useStyles;
