import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid, { GridProps } from "@material-ui/core/Grid";

const useStyles = makeStyles({
  grid: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px",
    flexBasis: "auto",
  },
});

export default function GridItem({
  children = "",
  className,
  ...props
}: GridProps) {
  const classes = useStyles();
  return (
    <Grid item {...props} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}
