import React from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import HeaderLinks from "components/Header/headerLinks";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Header
        brand="Nanoscience and Technology Laboratory"
        rightLinks={<HeaderLinks />}
        fixed
      />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
