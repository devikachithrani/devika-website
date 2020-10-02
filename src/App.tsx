import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Pages from "pages";
import { HOME_PAGE_ROUTE, MEMBERS_PAGE_ROUTE } from "constants/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={HOME_PAGE_ROUTE} component={Pages.Home} />
        <Route path={MEMBERS_PAGE_ROUTE} component={Pages.Members} />
      </Switch>
    </Router>
  );
}

export default App;
