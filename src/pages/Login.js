import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Form, Input } from '../components/Form';

class Login extends Component {
  constructor(props) {
    super(props);
    this.fields = [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
    ].map(field => {
      const ref = React.createRef();
      return {
        ...field,
        ref,
      };
    });
  }

  static propTypes = {
    manageAuth: PropTypes.func.isRequired,
  };

  onSubmit = async ([email, password]) => {
    if (!email.length || !password.length) return { err: 'Fill in all the fields!' };
    else {
      const res = await this.props.manageAuth({ email, password }, 'login');
      if (!res) return { err: 'Server: Login Error' };
    }
    return { err: null };
  };

  render() {
    return (
      <div className="login">
        <Form onSubmit={this.onSubmit} title="Login Form">
          {this.fields.map(props => (
            <Input {...props} key={props.name} />
          ))}
        </Form>
        <Link to="/signup">Not a member?</Link>
      </div>
    );
  }
}

export default Login;
