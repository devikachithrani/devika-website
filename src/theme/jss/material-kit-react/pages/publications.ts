import {
  title,
  container,
  grayColor,
  primaryColor,
} from "theme/jss/material-kit-react/material-kit-react";

import { makeStyles } from "@material-ui/core/styles";

const teamStyle = makeStyles({
  container: { ...container },
  section: {
    padding: "70px 0",
    textAlign: "left",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  authors: {
    display: "inline",
  },
  citationDetails: {
    display: "inline",
    color: grayColor,
  },
  titleLink: {
    color: primaryColor,
  },
  pagination: {
    justifyContent: "center",
  },
  citations: {
    textAlign: "center",
  },
});

export default teamStyle;
