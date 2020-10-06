import { title } from "theme/jss/material-kit-react/material-kit-react";

import { makeStyles } from "@material-ui/core/styles";

const workWithUs = makeStyles({
  section: {
    padding: "70px 0",
  },
  title: {
    ...title,
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center",
  },
  description: {
    color: "#999",
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px",
  },
});

export default workWithUs;
