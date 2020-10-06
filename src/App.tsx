import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Pages from "pages";
import {
  HOME_PAGE_ROUTE,
  MEMBERS_PAGE_ROUTE,
  NEWS_PAGE_ROUTE,
  PUB_PAGE_ROUTE,
} from "constants/routes";
import useLocationBlocker from "util/blockLocation";

const Routes = () => {
  useLocationBlocker();
  return (
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} component={Pages.Home} />
      <Route path={MEMBERS_PAGE_ROUTE} component={Pages.Members} />
      <Route path={NEWS_PAGE_ROUTE} component={Pages.News} />
      <Route path={PUB_PAGE_ROUTE} component={Pages.Publications} />
      <Route path={"*"} component={Pages.NotFound} />
    </Switch>
  );
};

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
