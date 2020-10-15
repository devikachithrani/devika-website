import React from "react";

import useStyles from "theme/jss/material-kit-react/pages/newsItem";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import { ResultType } from "util/getMD";

const NewsItem = (props: NewsProps) => {
  const classes = useStyles();

  const { news } = props;
  const date = new Date(news.date + " GMT -0800");
  return (
    <GridContainer className={classes.newsContainer}>
      <GridItem md={3} lg={2}>
        <h3 className={classes.date}>
          {date.toLocaleString("default", { month: "short" }) +
            " " +
            date.getDate() +
            " " +
            date.getFullYear()}
        </h3>
      </GridItem>

      <GridItem md={9} lg={10}>
        <GridContainer item>
          <GridItem>
            <h3 className={classes.title}>{news.title}</h3>
          </GridItem>
          <GridItem>
            <p
              className={classes.news}
              dangerouslySetInnerHTML={{
                __html: news.contentHtml,
              }}
            ></p>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

type NewsProps = {
  news: ResultType;
};

export default NewsItem;
