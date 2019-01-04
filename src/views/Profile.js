import React, { Component } from 'react';

import { connect } from 'react-redux';
import { authActions } from '../store/actions';

import AppHOC from '../hoc/AppHOC';
import ProfileForm from '../containers/ProfileForm';
import AddressList from '../containers/AddressList';
import AddressForm from '../containers/AddressForm';
import OrderList from '../containers/OrderList';

class Profile extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <React.Fragment>
        <div className="columns">
          <div className="column">
            {this.props.currentUser.client ? (
              <ProfileForm currentUser={this.props.currentUser} />
            ) : null}
          </div>
          <div className="column">
            <AddressList />
            <AddressForm />
          </div>
        </div>
        <div className="columns">
          <OrderList />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(authActions.getProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHOC(Profile));
