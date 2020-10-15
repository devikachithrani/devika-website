/* eslint-disable array-callback-return */

import React, { useEffect, useState } from "react";
// Components
import Layout from "components/Layout";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import useStyles from "theme/jss/material-kit-react/pages/members";

import { getSortedMDData, ResultType } from "util/getMD";

import Member from "./member";

export interface MemberState extends ResultType {
  active: boolean;
  credentials: string;
  position: string;
  funcidng: string;
  linkedIn: string;
  profile: string;
  email?: string;
}

const Members = () => {
  const classes = useStyles();
  const [members, setMembers] = useState<MemberState[]>();

  useEffect(() => {
    const getData = async () => {
      const results = (await getSortedMDData("lab", false)) as MemberState[];
      console.log(results);
      setMembers(results);
    };

    getData();
  }, []);
  return (
    <Layout>
      <div className={classes.section}>
        <h2 className={classes.title}>Meet our Team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} md={6} lg={4}>
              <h3 className={classes.title}>Head of Lab</h3>
              {members &&
                members.map((member) => {
                  if (member.active && member.id === "devikac") {
                    return <Member member={member} key={member.id} />;
                  }
                })}
            </GridItem>
            <GridContainer item lg={8} md={6}>
              <GridItem>
                <h3 className={classes.title}>Current Members</h3>
              </GridItem>
              {members &&
                members.map((member) => {
                  if (member.active && member.id !== "devikac") {
                    return <Member member={member} lg={4} key={member.id} />;
                  }
                })}
            </GridContainer>
          </GridContainer>

          <GridContainer>
            <GridItem>
              <h3 className={classes.title}>Previous Graduate Students</h3>
            </GridItem>
            {members &&
              members
                .slice(0)
                .reverse()
                .map((member) => {
                  if (!member.active) {
                    return <Member member={member} lg={4} key={member.id} />;
                  }
                })}
          </GridContainer>
        </div>
      </div>
    </Layout>
  );
};

export default Members;
