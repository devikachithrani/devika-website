import React from "react";
import classNames from "classnames";
import Header from "components/Header";
import HeaderLinks from "components/Header/headerLinks";
import Parallax from "components/Parallax";
import Footer from "components/Footer";

import useStyles from "theme/jss/material-kit-react/pages/homePage";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Button from "components/Button";
import Problem from "./sections/aboutUs";

const Home = (props: HomeProps) => {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        brand="Nanoscience and Technology Laboratory"
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
              <h1 className={classes.title}>
                Nanoscience and Technology Laboratory
              </h1>
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
                href="https://www.dropbox.com/s/op3ofwfoxrh46z9/RRS20_S15b_DevikaChithrani_Final.mp4?dl=0"
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
      <Footer />
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
