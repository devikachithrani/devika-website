import {
  container,
  title,
} from "theme/jss/material-kit-react/material-kit-react";

import { makeStyles } from "@material-ui/core/styles";

const newsStyle = makeStyles({
  section: {
    padding: "70px 0",
    textAlign: "center",
  },
  container: {
    zIndex: 12,
    ...container,
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    textAlign: "center",
  },
});

export default newsStyle;
