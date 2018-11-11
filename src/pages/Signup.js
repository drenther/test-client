import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Form, Input } from '../components/Form';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.fields = [
      { name: 'name', label: 'Name', type: 'text' },
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

  onSubmit = async ([name, email, password]) => {
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
      <div className="signup">
        <Form onSubmit={this.onSubmit} title="Signup Form">
          {this.fields.map(props => (
            <Input {...props} key={props.name} />
          ))}
        </Form>
        <Link to="/login">Already a member?</Link>
      </div>
    );
  }
}

export default Signup;
