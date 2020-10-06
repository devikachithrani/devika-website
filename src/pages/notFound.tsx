import React from "react";
import Layout from "components/Layout";
import GridContainer from "components/Grid/GridContainer";

const NotFound = () => {
  return (
    <Layout>
      <GridContainer justify={"center"}>
        <h1>404 - Not Found</h1>
      </GridContainer>
    </Layout>
  );
};

export default NotFound;
