import React, { Component, Fragment, forwardRef } from 'react';
import PropTypes from 'prop-types';

export class Form extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
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

  state = { err: '' };

  onReset = () => {
    React.Children.forEach(this.props.children, child => {
      child.ref.current.value = '';
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const values = React.Children.map(this.props.children, child => child.ref.current.value);
    const { err } = await this.props.onSubmit(values);
    if (err) this.setState({ err });
  };

  render() {
    const { children, title, submitText, resetText } = this.props;
    return (
      <form method="POST" onSubmit={this.onSubmit} onReset={this.onReset}>
        <output>{this.state.err}</output>
        <fieldset>
          <legend>{title}</legend>
          {children}
          <div className="buttons">
            <button type="reset">{resetText}</button>
            <button type="submit">{submitText}</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export const Input = forwardRef(({ name, label, ...props }, ref) => {
  return (
    <Fragment>
      <label htmlFor={name}>{label}</label>
      <input name={name} ref={ref} {...props} />
    </Fragment>
  );
});

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  defaultValue: '',
  type: 'text',
  placeholder: '',
  required: true,
};
