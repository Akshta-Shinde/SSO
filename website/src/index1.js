import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Home, FAQ, Investors, MainApp, Unicorns, Profile } from './pages';
import { SignIn, SignUp } from './auth';
import 'normalize.css';
import Amplify,{ API, graphqlOperation } from 'aws-amplify';
import awsConfig from './amplify-config';
import { onCreateBook } from "./graphql/mutations";
import { listBooks } from './graphql/queries';

Amplify.configure(awsConfig);

const isAuthenticated = () => Amplify.Auth.user !== null;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/signin' />
  )} />
)

class App extends React.Component {
  render() {
    return (
      <SignIn></SignIn>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
