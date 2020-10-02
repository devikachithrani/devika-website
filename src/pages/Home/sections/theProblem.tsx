import React, { useState, useEffect } from "react";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import useStyles from "theme/jss/material-kit-react/pages/theProblem";
import { getMDData } from "util/getMD";

const AboutSection = () => {
  const classes = useStyles();

  const [intro, setIntro] = useState({ id: "", contentHtml: "" });

  useEffect(() => {
    const fetchMD = async () => {
      const result = await getMDData("intro");
      setIntro(result);
    };
    fetchMD();
  }, []);

  return (
    <div className={classes.section}>
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={10}>
          <h2 className={classes.title}>The problem</h2>
          <h5 className={classes.description}>{intro.contentHtml}</h5>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default AboutSection;
