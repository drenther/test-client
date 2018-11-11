import React, { Component } from 'react';

import { apiUtils } from '../helpers';

class Home extends Component {
  state = {
    loading: true,
    data: '',
  };

  async componentDidMount() {
    const { data } = await apiUtils.request('public');
    if (data) {
      this.setState({ loading: false, data });
    }
  }

  render() {
    const { loading, data } = this.state;
    return <div className="home">{loading ? 'Loading data...' : `${data}`}</div>;
  }
}

export default Home;
