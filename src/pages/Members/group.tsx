import React, { useEffect, useState } from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import useStyles from "theme/jss/material-kit-react/components/photoStyle";
import { getSortedMDData, ResultType } from "util/getMD";

const Group = () => {
  const classes = useStyles();

  const items = 3;

  return <GridContainer></GridContainer>;
};

export default Group;
