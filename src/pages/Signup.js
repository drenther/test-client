import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from '../components/Form';

class Signup extends Component {
  static propTypes = {
    manageAuth: PropTypes.func.isRequired,
  };

  onSubmit = async ({ name, email, password }) => {
    if (!name.length && !email.length && !password.length) return { err: 'Fill in all the fields!' };
    else if (password.length < 8) return { err: 'Password must contain at least 8 characters!' };
    else {
      const res = await this.props.manageAuth({ name, email, password }, 'signup');
      if (!res) return { err: 'Server: Signup error!' };
    }
    return { err: null };
  };

  render() {
    return (
      <Form initialState={{ name: '', email: '', password: '' }} onSubmit={this.onSubmit} title="Signup Form">
        <Input name="name" label="Name" key="name" />
        <Input name="email" type="email" label="Email" key="email" />
        <Input name="password" type="password" label="Password" key="password" />
      </Form>
    );
  }
}

export default Signup;
