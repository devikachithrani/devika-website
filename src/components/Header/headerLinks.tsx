import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/Button";

import useStyles from "theme/jss/material-kit-react/components/headerLinkStyle";
import {} from "constants";
import {
  MEMBERS_PAGE_ROUTE,
  PUB_PAGE_ROUTE,
  NEWS_PAGE_ROUTE,
  CONTACT_US_PAGE_ROUTE,
  PHOTOS_PAGE_ROUTE,
} from "constants/routes";

const HeaderLinks = () => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link className={classes.link} to={MEMBERS_PAGE_ROUTE}>
          <Button color="transparent" size="sm" className={classes.navLink}>
            Members
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link className={classes.link} to={PUB_PAGE_ROUTE}>
          <Button color="transparent" size="sm" className={classes.navLink}>
            Publications
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link className={classes.link} to={NEWS_PAGE_ROUTE}>
          <Button color="transparent" size="sm" className={classes.navLink}>
            News
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link className={classes.link} to={PHOTOS_PAGE_ROUTE}>
          <Button color="transparent" size="sm" className={classes.navLink}>
            Group Photos
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link className={classes.link} to={CONTACT_US_PAGE_ROUTE}>
          <Button color="transparent" size="sm" className={classes.navLink}>
            Contact Us
          </Button>
        </Link>
      </ListItem>
    </List>
  );
};

export default HeaderLinks;
