import React from "react";

import useStyles from "theme/jss/material-kit-react/pages/publications";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import { CitationType } from "util/getDOI";

const extraNames = [
  "Chithrani, DB",
  "Chithrani, BD",
  "Chithrani, D",
  "Bannister, AH",
  "Bozdoğan, EPD",
];

const Publication = (props: PublicationProps) => {
  const classes = useStyles();

  const { publication, index, users, citation } = props;
  const main: { xs: 10 | 6; sm: 10 | 7; md: 10 | 8; lg: 10 | 9 } = {
    xs: 10,
    sm: 10,
    md: 10,
    lg: 10,
  };
  if (citation) {
    main.xs = 6;
    main.sm = 7;
    main.md = 8;
    main.lg = 9;
  }
  return (
    <GridContainer>
      <GridItem xs={2} sm={2} md={2} lg={1}>
        <h2>{index + 1}.</h2>
      </GridItem>
      <GridItem xs={main.xs} sm={main.sm} md={main.md} lg={main.lg}>
        <h4 className={classes.title}>
          <a href={publication.URL} className={classes.titleLink}>
            {publication.title}
          </a>
        </h4>
        {/** Maps the names of the authors properly, including bolding and proper initials */}
        {publication.authors.map((author, index) => {
          // Make the name that will be displayed
          const name =
            author.family.split(" ").slice(-1) +
            ", " +
            author.given
              .split(" ")
              .map((word) => word[0])
              .join("");

          const notLast = index + 1 !== publication.authors.length;

          if (users.includes(name) || extraNames.includes(name)) {
            return (
              <div className={classes.authors} key={author.family}>
                <b>{name}.</b>
                {notLast && ","}{" "}
              </div>
            );
          } else {
            return (
              <div className={classes.authors} key={author.family}>
                {name}.{notLast && ","}{" "}
              </div>
            );
          }
        })}

        <br />

        {/** Journal, date, DOI */}
        <div className={classes.citationDetails}>
          {!publication.book && (
            <div>
              {publication.journal}.{" "}
              {publication.date.getFullYear() +
                " " +
                publication.date.toLocaleString("default", { month: "short" })}
              ; DOI: {publication.DOI}
            </div>
          )}
          {publication.book && (
            <div>
              in {publication.journal}. pp. {publication.book.page}.{" "}
              {publication.book.publsher}
              {", "}
              {publication.date.getFullYear() +
                " " +
                publication.date.toLocaleString("default", { month: "short" })}
              ; DOI: {publication.DOI}
            </div>
          )}
        </div>
      </GridItem>
      {citation && (
        <GridItem xs={4} sm={3} md={2} lg={1}>
          <div className={classes.citations}>
            <div className={classes.title}>Citations</div>
            <small>{publication.citations}</small>
          </div>
        </GridItem>
      )}
    </GridContainer>
  );
};

type PublicationProps = {
  publication: CitationType;
  users: string[];
  index: number;
  citation: boolean;
};

export default Publication;
