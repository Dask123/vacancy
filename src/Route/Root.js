import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from '../App';
import Details from '../Components/Details';

export default class Root extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="details/:id" component={Details} />
      </Router>
    );
  }
}