/* eslint-disable array-callback-return */

import React from "react";
import useStyles from "theme/jss/material-kit-react/pages/members";
// Components
import Layout from "components/Layout";

import Members from "./members";

const Lab = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.section}>
        <Members />
      </div>
    </Layout>
  );
};

export default Lab;
