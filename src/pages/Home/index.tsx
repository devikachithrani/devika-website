import React from "react";
import Header from "components/Header";

const Home = (props: HomeProps) => {
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="rose"
        brand="KBromma"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
    </div>
  );
};

export default Home;

export type HomeProps = {
  fixed?: boolean;
  brand?: string;
  leftLinks?: React.ReactNode;
  rightLinks?: React.ReactNode;
  absolute?: boolean;
};
