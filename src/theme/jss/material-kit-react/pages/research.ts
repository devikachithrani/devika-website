import {
  container,
  grayColor,
} from "theme/jss/material-kit-react/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";

const carouselStyle = makeStyles({
  section: {
    padding: "70px 0",
  },
  container,
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  slickImage: {
    backgroundColor: grayColor,
  },
});

export default carouselStyle;
