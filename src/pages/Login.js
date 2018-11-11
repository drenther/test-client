import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from '../components/Form';

class Login extends Component {
  static propTypes = {
    manageAuth: PropTypes.func.isRequired,
  };

  onSubmit = async ({ email, password }) => {
    if (!email.length || !password.length) return { err: 'Fill in all the fields!' };
    else {
      const res = await this.props.manageAuth({ email, password }, 'login');
      if (!res) return { err: 'Server: Login Error' };
    }
    return { err: null };
  };

  render() {
    return (
      <Form initialState={{ email: '', password: '' }} onSubmit={this.onSubmit} title="Login Form">
        <Input name="email" type="email" label="Email" key="email" />
        <Input name="password" type="password" label="Password" key="password" />
      </Form>
    );
  }
}

export default Login;
