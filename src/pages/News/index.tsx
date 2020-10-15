import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import GridContainer from "components/Grid/GridContainer";
import GridItem from 'components/Grid/GridItem'
import Pagination from "components/Pagination";
import NewsItem from "./newsItem";

import useStyles from "theme/jss/material-kit-react/pages/news";
import { getSortedMDData, ResultType } from "util/getMD";

const News = () => {
  const classes = useStyles();

  const [news, setNews] = useState<ResultType[]>();
  // For pagination
  const [currentNews, setCurrentNews] = useState<ResultType[]>();
  const pageLimit = 5;
  // The current page
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getNews = async () => {
      const results = await getSortedMDData("news");
      setNews(results);
    };

    getNews();
  }, []);

  useEffect(() => {
    onPageChanged({ currentPage, pageLimit });
  }, [news]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pagination stuff
  const onPageChanged = (data: { currentPage: number; pageLimit: number }) => {
    const { currentPage, pageLimit } = data;
    const offset = pageLimit * (currentPage - 1);
    setCurrentNews(news?.slice(offset, offset + pageLimit));
    setCurrentPage(currentPage);
  };

  return (
    <Layout>
      <div className={classes.section}>
        <div className={classes.container}>
          <h1 className={classes.title}>News in the Lab</h1>
          <br />
          <GridContainer>
            {news &&
              currentNews &&
              <div>
                <GridContainer><GridItem lg={4} md={6} sm={8}>
                    Page {currentPage}/{Math.ceil(news.length/pageLimit)}
                  </GridItem>
                </GridContainer>
                {currentNews.map((newsVal) => {
                  return <NewsItem news={newsVal} key={newsVal.id} />;
                })}
              </div>}
          </GridContainer>
          <br />
          <GridContainer justify={"center"}>
            {news && (
              <Pagination
                totalRecords={news.length}
                pageLimit={pageLimit}
                onPageChanged={onPageChanged}
                scroll={30}
              />
            )}
          </GridContainer>
        </div>
      </div>
    </Layout>
  );
};

export default News;
