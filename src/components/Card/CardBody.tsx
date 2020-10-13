import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import useStyles from "theme/jss/material-kit-react/components/cardBodyStyle";
import setDefaultProps from "util/setDefaultProps";

export default function CardBody(props: CardBodyType) {
  const classes = useStyles();
  const defProps = setDefaultProps(props, {
    className: undefined,
  });
  const { className, children, ...rest } = defProps;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [className]: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

type CardBodyType = {
  className?: string;
  children: React.ReactNode;
};
