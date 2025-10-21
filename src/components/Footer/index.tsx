/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import useStyles from "theme/jss/material-kit-react/components/footerStyle";

const Footer = (props: FooterProps) => {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>Produced by Kyle Bromma</div>
        <div className={classes.right}>
          &copy; {new Date().getFullYear()} Devika Chithrani. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

type FooterProps = {
  whiteFont?: boolean;
};
