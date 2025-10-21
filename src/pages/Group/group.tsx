import React, { useEffect, useState } from "react";
import classNames from "classnames";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

import useStyles from "theme/jss/material-kit-react/components/photoStyle";
import { getSortedMDData, ResultType } from "util/getMD";

interface ImageType extends ResultType {
  img: string;
}

const Group = () => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );
  const [images, setImages] = useState<ImageType[]>();
  const [imageSliced, setImageSliced] = useState<ImageType[][]>();

  // get the images on load
  useEffect(() => {
    const getImages = async () => {
      const result = (await getSortedMDData("group")) as ImageType[];
      setImages(result);
    };
    getImages();
  }, []);

  // Set the sliced images on load
  useEffect(() => {
    if (images) {
      const firstThird = images.filter((val, index) => {
        return index % 3 === 0;
      });
      const secondThird = images.filter((val, index) => {
        return index % 3 === 1;
      });
      const thirdThird = images.filter((val, index) => {
        return index % 3 === 2;
      });

      setImageSliced([firstThird, secondThird, thirdThird]);
    }
  }, [images]);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Photos from the Lab</h2>
      <GridContainer>
        <GridItem lg={4} md={6} sm={6} className={classes.itemGrid}>
          {images &&
            imageSliced &&
            imageSliced[0].map((image) => {
              return (
                <Card plain>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/group/${image.img}`}
                    alt={image.title}
                    className={imageClasses}
                  />
                  <h4 className={classes.cardTitle}>{image.title}</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      dangerouslySetInnerHTML={{
                        __html: image.contentHtml,
                      }}
                    ></p>
                  </CardBody>
                </Card>
              );
            })}
        </GridItem>
        <GridItem lg={4} md={6} sm={6} className={classes.itemGrid}>
          {images &&
            imageSliced &&
            imageSliced[1].map((image) => {
              return (
                <Card plain>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/group/${image.img}`}
                    alt={image.title}
                    className={imageClasses}
                  />
                  <h4 className={classes.cardTitle}>{image.title}</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      dangerouslySetInnerHTML={{
                        __html: image.contentHtml,
                      }}
                    ></p>
                  </CardBody>
                </Card>
              );
            })}
        </GridItem>
        <GridItem lg={4} md={6} sm={6} className={classes.itemGrid}>
          {images &&
            imageSliced &&
            imageSliced[2].map((image) => {
              return (
                <Card plain>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/group/${image.img}`}
                    alt={image.title}
                    className={imageClasses}
                  />
                  <h4 className={classes.cardTitle}>{image.title}</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      dangerouslySetInnerHTML={{
                        __html: image.contentHtml,
                      }}
                    ></p>
                  </CardBody>
                </Card>
              );
            })}
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Group;
