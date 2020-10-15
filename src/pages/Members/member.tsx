import React from "react";

import classNames from "classnames";
import useStyles from "theme/jss/material-kit-react/pages/members";

import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import Button from "components/Button";

import setDefaultProps from "util/setDefaultProps";

import { MemberState } from "./index";

const Member = (props: MemberProps) => {
  const classes = useStyles();

  const defProps = setDefaultProps(props, {
    xs: 12,
    md: 12,
    lg: 12,
  });

  const { member, xs, md, lg } = defProps;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <GridItem xs={xs} md={md} lg={lg}>
      <Card plain>
        <GridItem xs={12} md={12} lg={6} className={classes.itemGrid}>
          <img
            src={`${process.env.PUBLIC_URL}/img/profile/${member.profile}`}
            alt={member.title}
            className={imageClasses}
          />
        </GridItem>
        <h4 className={classes.cardTitle}>
          {member.title} <br />
          <small className={classes.smallTitle}>
            {member.position}
            <br /> {member.email}
          </small>
        </h4>
        <CardBody>
          <p
            className={classes.description}
            dangerouslySetInnerHTML={{
              __html: member.contentHtml,
            }}
          ></p>
        </CardBody>
        {member.linkedin && (
          <CardFooter className={classes.justifyCenter}>
            <Button
              justIcon
              color="transparent"
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={classes.socials + " fab fa-linkedin"} />
            </Button>
          </CardFooter>
        )}
      </Card>
    </GridItem>
  );
};

type MemberProps = {
  member: MemberState;
  xs?: 12 | 6 | 4 | 3 | 2 | 1 | 8;
  md?: 12 | 6 | 4 | 3 | 2 | 1 | 8;
  lg?: 12 | 6 | 4 | 3 | 2 | 1 | 8;
};

export default Member;
