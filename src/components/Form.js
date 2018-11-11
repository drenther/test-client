import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class Form extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    initialState: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
    submitText: PropTypes.string,
    resetText: PropTypes.string,
  };

  static defaultProps = {
    title: 'Form',
    submitText: 'Submit',
    resetText: 'Reset',
  };

  state = { ...this.props.initialState, err: '' };

  defaultOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onReset = () => {
    this.setState({
      ...this.props.initialState,
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { err } = await this.props.onSubmit(this.state);
    if (err) this.setState({ err });
  };

  render() {
    const { children, title, onChange, submitText, resetText } = this.props;
    return (
      <form method="POST" onSubmit={this.onSubmit} onReset={this.onReset}>
        <output>{this.state.err}</output>
        <fieldset>
          <legend>{title}</legend>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              value: this.state[child.props.name],
              onChange: child.props.onChange || onChange || this.defaultOnChange,
            });
          })}
          <button type="reset">{resetText}</button>
          <button type="submit">{submitText}</button>
        </fieldset>
      </form>
    );
  }
}

export const Input = ({ name, label, onChange, value, type, required }) => {
  return (
    <Fragment>
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} onChange={onChange} value={value} required={required} />
    </Fragment>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  value: '',
  type: 'text',
  required: true,
};
