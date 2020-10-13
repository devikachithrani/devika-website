import React from "react";

import classNames from "classnames";
import { Link } from "react-router-dom";

//Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

//Icons
import Menu from "@material-ui/icons/Menu";

import useStyles from "theme/jss/material-kit-react/components/headerStyle";
import setDefaults from "util/setDefaultProps";
import { HOME_PAGE_ROUTE } from "constants/routes";

const Header = (props: HeaderProps) => {
  const defProps = setDefaults(props, {
    color: "white",
    changeColorOnScroll: { color: "white", height: 0 },
  });
  const classes = useStyles();

  // for mobile view
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Change color of header using this function
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = defProps;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };

  // The effect for changing header color
  React.useEffect(() => {
    if (defProps.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (defProps.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  // Deconstruct our props
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = defProps;

  // And name appBarClasses for the MUI AppBar
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  // Simple button for our brand
  const brandComponent = (
    <Link className={classes.link} to={HOME_PAGE_ROUTE}>
      <Button className={classes.title}>{brand}</Button>
    </Link>
  );

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

Header.defaultProp = {
  color: "white",
};

export default Header;

export type HeaderProps = {
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "transparent"
    | "white"
    | "rose"
    | "dark";
  fixed?: boolean;
  brand?: string;
  leftLinks?: React.ReactNode;
  rightLinks?: React.ReactNode;
  absolute?: boolean;
  changeColorOnScroll?: {
    height: number;
    color:
      | "primary"
      | "info"
      | "success"
      | "warning"
      | "danger"
      | "transparent"
      | "white"
      | "rose"
      | "dark";
  };
};
