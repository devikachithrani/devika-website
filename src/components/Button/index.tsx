import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import Button from "@material-ui/core/Button";

import useStyles from "theme/jss/material-kit-react/components/buttonStyle";
import setDefaultProps from "util/setDefaultProps";

const RegularButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const args = setDefaultProps(props, {
      size: "lg",
      color: "transparent",
    });

    const {
      color,
      round,
      children,
      fullWidth,
      disabled,
      simple,
      size,
      block,
      link,
      justIcon,
      className,
      ...rest
    } = args;

    const classes = useStyles();

    const btnClasses = classNames({
      [classes.button]: true,
      [classes[size]]: size,
      [classes[color]]: color,
      [classes.round]: round,
      [classes.fullWidth]: fullWidth,
      [classes.disabled]: disabled,
      [classes.simple]: simple,
      [classes.block]: block,
      [classes.link]: link,
      [classes.justIcon]: justIcon,
      [className]: className,
    });

    return (
      <Button {...rest} ref={ref} className={btnClasses}>
        {children}
      </Button>
    );
  }
);

export default RegularButton;

export type ButtonProps = {
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "rose"
    | "white"
    | "facebook"
    | "twitter"
    | "google"
    | "github"
    | "transparent";
  size?: "sm" | "lg";
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
};
