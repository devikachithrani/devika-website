import React from "react";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import useStyles from "theme/jss/material-kit-react/pages/whatWeDo";

const AboutSection = () => {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={10}>
          <h2 className={classes.title}>The problem</h2>
          <h5 className={classes.description}>
            In this lab, we use Gold Nanoparticles as our basis for research.
            Gold nanoparticles are safe and biocompatible, straightforward to
            produce, and simple to
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default AboutSection;
