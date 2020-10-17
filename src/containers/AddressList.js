import React, { Component } from 'react';

import { connect } from 'react-redux';
import { addressActions } from '../store/actions';

import Card from '../components/Card';

class AddressList extends Component {
  componentDidMount() {
    this.props.getAddresses();
  }
  render() {
    return this.props.addresses.length
      ? this.props.addresses.map(item => (
          <Card key={item.id}>
            <Card.Content>
              <div className="content">
                Street: {item.street}
                <br />
                City: {item.city}
                <br />
                County: {item.county}
                <br />
                Postal Code: {item.postalCode}
                <br />
                Phone Number: {item.phoneNumber}
              </div>
            </Card.Content>
          </Card>
        ))
      : null;
  }
}

const mapStateToProps = state => ({
  addresses: state.address.addresses
});

const mapDispatchToProps = dispatch => ({
  getAddresses: () => dispatch(addressActions.getAddresses())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressList);
