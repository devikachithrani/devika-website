import React from "react";

import CreateIcon from "@material-ui/icons/Create";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import Layout from "components/Layout";
import NavPill from "components/NavPill";

import useStyles from "theme/jss/material-kit-react/pages/publications";

import Publications from "./publications";

const PublishedMaterial = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.section}>
        <div className={classes.container}>
          <NavPill
            alignCenter
            tabs={[
              {
                tabButton: "Publications",
                tabIcon: CreateIcon,
                tabContent: (
                  <Publications title="Publications" type="publications" />
                ),
              },
              {
                tabButton: "Book Chapters",
                tabIcon: MenuBookIcon,
                tabContent: <Publications title="Book Chapters" type="books" />,
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PublishedMaterial;
