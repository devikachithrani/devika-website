import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// core components
import useStyles from "theme/jss/material-kit-react/components/cardStyle";
import setDefaultProps from "util/setDefaultProps";

export default function Card(props: CardType) {
  const classes = useStyles();

  const defProps = setDefaultProps(props, {
    className: undefined,
  });
  const { className, children, plain, carousel, ...rest } = defProps;

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardCarousel]: carousel,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

type CardType = {
  className?: string;
  plain?: boolean;
  carousel?: boolean;
  children: React.ReactNode;
};
