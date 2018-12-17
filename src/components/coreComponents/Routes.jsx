import React from 'react';
import { Route } from 'react-router-dom';

import SplashPage from '../SplashPage';
import StudentRegistrationForm from '../StudentRegistrationForm';
import StudentRegistrationCorrectionForm from '../StudentRegistrationCorrectionForm';
import Footer from './Footer';
import SplashPagePrePopulated from '../SplashPagePrePopulated';
import AdminPanel from '../AdminPanel';
import DataGrid from '../DataGrid';

const Routes = () => (
  <div>
    <Route exact path={'/'} component={SplashPage} />
    <Route exact path={'/splashPrePopulated'} component={SplashPagePrePopulated} />
    <Route path={'/studentRegister'} component={StudentRegistrationForm}  />
    <Route exact path={'/studentCorrection'} component={StudentRegistrationCorrectionForm} />
    <Route exact path={'/adminPanel'} component={AdminPanel} />
    <Route exact path={'/dataGrid'} component={DataGrid}/>
    <Footer />
  </div>
);

export default Routes;
