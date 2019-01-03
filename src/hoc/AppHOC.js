import React, { Component } from 'react';

import Header from '../containers/Header';

const appHOC = WrappedComponent =>
  class extends Component {
    render() {
      return (
        <div style={{ minHeight: '100vh' }} className="has-background-light">
          <Header />
          <div
            style={{ marginTop: '20px' }}
            className="container is-fluid mt-2"
          >
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  };

export default appHOC;
