import React, { useEffect, useState } from "react";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import useStyles from "theme/jss/material-kit-react/pages/aboutUs";
import { getMDData } from "util/getMD";

const AboutSection = () => {
  const [intro, setIntro] = useState({
    id: "",
    contentHtml: "",
    title: "",
  });

  useEffect(() => {
    const getData = async () => {
      const result = await getMDData("intro");
      setIntro(result);
    };
    getData();
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={10}>
          <h2 className={classes.title}>{intro.title}</h2>
          <h5 className={classes.description}>
            <div dangerouslySetInnerHTML={{ __html: intro.contentHtml }} />
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default AboutSection;
