import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

import { apiUtils, tokenUtils } from '../helpers';

class AuthProvider extends PureComponent {
  state = {
    loggedIn: false,
    name: '',
  };

  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.handleAuthState();
  }

  handleAuthState = () => {
    const token = tokenUtils.retrieve();
    if (token) {
      const {
        payload: { exp, name },
      } = jwt.decode(token, { complete: true });
      if (exp > parseInt(new Date().getTime() / 1000, 10)) {
        this.setState({
          loggedIn: true,
          name,
        });
      }
    } else {
      this.setState({
        loggedIn: false,
        name: '',
      });
    }
  };

  manageAuth = async (body, type) => {
    const { csrfToken } = await apiUtils.request(type, 'POST', true, body);
    if (csrfToken) {
      tokenUtils.persist(csrfToken);
      this.handleAuthState();
      return true;
    }
    return false;
  };

  logout = async () => {
    const { data } = await apiUtils.request('logout', 'GET', true);
    if (data) {
      tokenUtils.clear();
      this.handleAuthState();
      return true;
    }
    return false;
  };

  render() {
    const { props, state, manageAuth, logout, handleAuthState } = this;
    return props.children(state, { manageAuth, logout, handleAuthState });
  }
}

export default AuthProvider;
