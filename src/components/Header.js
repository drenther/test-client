import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ loggedIn, name, logout }) => (
  <header>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/private">Private</NavLink>
    </nav>
    <div>
      {loggedIn ? (
        <Fragment>
          <span>Hello, {name} | </span>
          <button onClick={logout}>Logout</button>
        </Fragment>
      ) : (
        <Fragment>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </Fragment>
      )}
    </div>
  </header>
);

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
};

Header.defaultProps = {
  name: PropTypes.string.isRequired,
};

export default Header;
