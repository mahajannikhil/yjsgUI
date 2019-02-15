import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Routes from './Routes';

// FIXME: Indentation should be of 2 spaces.
//  ESLint issues

const AppContainer = () => (
  <HashRouter>
    <Route path={'/'} component={Routes} />
  </HashRouter>
);

export default AppContainer;
