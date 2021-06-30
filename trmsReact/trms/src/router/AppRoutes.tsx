import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../components/pages/login-page/LoginPage';
import RegisterPage from '../components/pages/register-page/RegisterPage';
import ReimbursementSubmissionPage from '../components/pages/reimbursementSubmission-page/reimbursementSubmissionPage';
import DisplayReimbursementsPage from '../components/pages/displayReimbursementsPage/displayReimbursementsPage';
import HomePage from '../components/pages/homepage/homepage';
const AppRoutes: React.FC<unknown> = (props) => {

  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route path='/register'>
        <RegisterPage />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/reimbursements'>
        < ReimbursementSubmissionPage />
      </Route>
      <Route path='/displayReimbursements'>
        <DisplayReimbursementsPage />
      </Route>
      <Route path='/'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default AppRoutes;