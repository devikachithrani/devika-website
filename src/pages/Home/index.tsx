import React from "react";
import classNames from "classnames";
import Header from "components/Header";
import HeaderLinks from "components/Header/headerLinks";
import Parallax from "components/Parallax";

import useStyles from "theme/jss/material-kit-react/pages/homePage";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Button from "components/Button";
import Problem from "./sections/theProblem";

const Home = (props: HomeProps) => {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        brand="Chithrani - Nanotechnology Lab"
        fixed
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={process.env.PUBLIC_URL + "/img/bg2.png"}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Nanotechnology Lab</h1>
              <h4>
                Nanotechnology involves creation and utilization of materials,
                devices or systems on the nanometer scale. The field of
                nanotechnology is currently undergoing explosive development on
                many fronts. Among other fields, nanotechnology is expected to
                generate innovations and play a critical role in the field of
                cancer nanomedicine.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=ISZMqKOvnNo&feature=emb_logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch Video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Problem />
        </div>
      </div>
    </div>
  );
};

export default Home;

export type HomeProps = {
  fixed?: boolean;
  brand?: string;
  leftLinks?: React.ReactNode;
  rightLinks?: React.ReactNode;
  absolute?: boolean;
};
