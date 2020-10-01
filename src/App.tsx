import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Pages from "./pages";
import { HOME_PAGE_ROUTE, ABOUT_PAGE_ROUTE } from "./constants/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={HOME_PAGE_ROUTE} component={Pages.Home} />
        <Route path={ABOUT_PAGE_ROUTE} component={Pages.About} />
      </Switch>
    </Router>
  );
}

export default App;
