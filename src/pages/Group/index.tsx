/* eslint-disable array-callback-return */

import React from "react";
import useStyles from "theme/jss/material-kit-react/pages/members";
// Components
import Layout from "components/Layout";

import Group from "../Group/group";

const Lab = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.section}>
        <Group />
      </div>
    </Layout>
  );
};

export default Lab;
