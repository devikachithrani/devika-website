import React, { useEffect, useState } from "react";

import { CitationType, getDois, sortByCitation, sortByDate } from "util/getDOI";
import { getSortedMDData } from "util/getMD";
import useStyles from "theme/jss/material-kit-react/pages/publications";
import Publication from "./publication";
import Pagination from "components/Pagination";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Toggle from "components/Toggle";

const Publications = (props: PublicationProps) => {
  // Our publications, that we will get via axios
  const [publications, setPublications] = useState<CitationType[]>();
  // For pagination
  const [currentPublications, setCurrentPublications] = useState<
    CitationType[]
  >();
  // If we are to order by citations
  const [orderByCitation, setOrderByCittaions] = useState<boolean>(false);
  // The number of values per page we will have
  const pageLimit = 5;

  // The current page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // The users from our .json file
  const [users, setUsers] = useState<string[]>();
  const classes = useStyles();
  const { type, title } = props;

  // Get all the publications and users in the lab
  useEffect(() => {
    const getCitation = async () => {
      const results = await getDois(type);
      setPublications(results);
      const members = await getSortedMDData("lab");
      const names = members.map((member) => {
        const nameSplit = member.title.split(" ");
        if (nameSplit.length === 2) {
          return nameSplit[1] + ", " + nameSplit[0][0];
        } else {
          return nameSplit[2] + ", " + nameSplit[0][0] + nameSplit[1][0];
        }
      });
      setUsers(names);
    };
    getCitation();
  }, []);

  // Change sorting method upon change in orderByCitation
  useEffect(() => {
    if (publications && orderByCitation) {
      setPublications(sortByCitation(publications));
    } else if (publications && !orderByCitation) {
      setPublications(sortByDate(publications));
    }
  }, [orderByCitation, publications]);

  useEffect(() => {
    onPageChanged({ currentPage, pageLimit });
  }, [publications, orderByCitation]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pagination stuff
  const onPageChanged = (data: { currentPage: number; pageLimit: number }) => {
    const { currentPage, pageLimit } = data;
    const offset = pageLimit * (currentPage - 1);
    setCurrentPublications(publications?.slice(offset, offset + pageLimit));
    setCurrentPage(currentPage);
  };

  return (
    <div>
      <GridContainer>
        <GridItem lg={9} md={8} sm={7} xs={12}>
          <h1 className={classes.title}>{title}</h1>
        </GridItem>
        <GridItem lg={3} md={4} sm={5} xs={12}>
          <Toggle
            label={"Sort by citations?"}
            checked={orderByCitation}
            setChecked={setOrderByCittaions}
          />
        </GridItem>
      </GridContainer>
      {!publications && (
        <GridContainer justify={"center"}>Loading...</GridContainer>
      )}
      {publications &&
        currentPublications &&
        users &&
        currentPublications.map((publication, index) => {
          return (
            <Publication
              publication={publication}
              index={pageLimit * (currentPage - 1) + index}
              users={users}
              key={publication.DOI}
              citation={orderByCitation}
            />
          );
        })}
      <br />
      <GridContainer justify={"center"}>
        {publications && (
          <Pagination
            totalRecords={publications.length}
            pageLimit={pageLimit}
            onPageChanged={onPageChanged}
          />
        )}
      </GridContainer>
    </div>
  );
};

export default Publications;

type PublicationProps = {
  type: string;
  title: string;
};
