import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = `${ApplicationPaths.LogOut}`;
      const logoutState = { local: true };
      return this.authenticatedView(userName, profilePath, logoutPath, logoutState);
    }
  }

  authenticatedView(userName, profilePath, logoutPath, logoutState) {
      return (<Fragment>
          <li className="nav-item">
              <Link className="btn btn-outline-info me-2" to={profilePath}>Profile</Link>
          </li>
          <li className="nav-item">
              <Link className="btn btn-info" to={logoutPath} state={logoutState}>Log out</Link>
          </li>  
    </Fragment>);
  }

  anonymousView(registerPath, loginPath) {
      return (<Fragment>
          <li className="nav-item">
              <Link className="btn btn-outline-info me-2" to={loginPath}>Login</Link>
          </li>
          <li className="nav-item">
              <Link className="btn btn-info" to={registerPath}>Sign-up</Link>
          </li>
    </Fragment>);
  }
}
