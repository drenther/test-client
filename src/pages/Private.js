import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { apiUtils, tokenUtils } from '../helpers';

class Private extends Component {
  state = {
    loading: true,
    data: '',
  };

  static propTypes = {
    handleAuthState: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    const { data } = await apiUtils.request('private', 'GET', true);
    if (data) {
      this.setState({ loading: false, data });
    } else {
      tokenUtils.clear();
      this.props.handleAuthState();
    }
  }

  render() {
    const { loading, data } = this.state;

    return <div className="home">{loading ? 'Loading data...' : `${data}`}</div>;
  }
}

export default Private;
