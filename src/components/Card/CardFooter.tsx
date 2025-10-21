import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// core components
import useStyles from "theme/jss/material-kit-react/components/cardFooterStyle";
import setDefaultProps from "util/setDefaultProps";

export default function CardFooter(props: CardFooterProps) {
  const classes = useStyles();

  const defProps = setDefaultProps(props, {
    className: undefined,
  });
  const { className, children, ...rest } = defProps;

  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [className]: className !== undefined,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

type CardFooterProps = {
  className?: string;
  children: React.ReactNode;
};
