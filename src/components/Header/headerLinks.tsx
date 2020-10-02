import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/Button";

import useStyles from "theme/jss/material-kit-react/components/headerLinkStyle";

const HeaderLinks = () => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button color="transparent" size="sm" className={classes.navLink}>
          About
        </Button>
      </ListItem>
    </List>
  );
};

export default HeaderLinks;
