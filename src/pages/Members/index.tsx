/* eslint-disable array-callback-return */

import React from "react";
import useStyles from "theme/jss/material-kit-react/pages/members";
import CreateIcon from "@material-ui/icons/Create";
// Components
import Layout from "components/Layout";
import NavPill from "components/NavPill";

import Members from "./members";
import Group from "./group";

const Lab = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.section}>
        <NavPill
          alignCenter
          tabs={[
            {
              tabButton: "Members",
              tabIcon: CreateIcon,
              tabContent: <Members />,
            },
            {
              tabButton: "Group Photos",
              tabIcon: CreateIcon,
              tabContent: <Group />,
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default Lab;
