import React, { useEffect, useState } from "react";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import useStyles from "theme/jss/material-kit-react/pages/members";

import { getSortedMDData, ResultType } from "util/getMD";
import Member from "./member";

export interface MemberState extends ResultType {
  active: boolean;
  credentials: string;
  position: string;
  funding: string;
  linkedIn: string;
  profile: string;
  email?: string;
  undergrad: boolean;
}

const Members = () => {
  const classes = useStyles();
  const [members, setMembers] = useState<MemberState[]>();
  useEffect(() => {
    const getData = async () => {
      const results = (await getSortedMDData("lab", false)) as MemberState[];
      setMembers(results);
    };

    getData();
  }, []);

  return (
    <div>
      <h2 className={classes.title}>Meet our Team</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} md={6} lg={4}>
            <h3 className={classes.title}>Head of Lab</h3>
            {members &&
              members.map((member): JSX.Element | undefined => {
                if (
                  member.active &&
                  member.id === "devikac" &&
                  !member.undergrad
                ) {
                  return <Member member={member} key={member.id} />;
                }
                return undefined;
              })}
          </GridItem>
          <GridContainer item lg={8} md={6}>
            <GridItem>
              <h3 className={classes.title}>Current Members</h3>
            </GridItem>
            {members &&
              members.map((member): JSX.Element | undefined => {
                if (
                  member.active &&
                  member.id !== "devikac" &&
                  !member.undergrad
                ) {
                  return <Member member={member} lg={4} key={member.id} />;
                }
                return undefined;
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
              .map((member): JSX.Element | undefined => {
                if (!member.active && !member.undergrad) {
                  return <Member member={member} lg={4} key={member.id} />;
                }
                return undefined;
              })}
        </GridContainer>

        <GridContainer>
          <GridItem>
            <h3 className={classes.title}>Previous Undergraduate Students</h3>
          </GridItem>
          {members &&
            members
              .slice(0)
              .reverse()
              .map((member) => {
                if (!member.active && member.undergrad) {
                  return (
                    <Member member={member} lg={3} md={6} key={member.id} />
                  );
                }
              })}
        </GridContainer>
      </div>
    </div>
  );
};

export default Members;
