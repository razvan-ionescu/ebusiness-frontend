import React, { Component } from 'react';

import * as yup from 'yup';
import { withFormik } from 'formik';

import { connect } from 'react-redux';
import { addressActions } from '../store/actions';

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const enhancer = withFormik({
  mapPropsToValues: () => ({
    street: '',
    city: '',
    county: '',
    postalCode: ''
  }),
  validationSchema: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    county: yup.string().required(),
    postalCode: yup.string().required()
  }),
  handleSubmit: (values, { props, resetForm }) => {
    props.postAddress({ ...values });
    resetForm();
  }
});

class AddressForm extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Input
            error={this.props.errors.street}
            value={this.props.values.street}
            onChange={this.props.handleChange('street')}
            placeholder="Street"
            label="Street"
            type="text"
          />
          <Input
            error={this.props.errors.city}
            value={this.props.values.city}
            onChange={this.props.handleChange('city')}
            placeholder="City"
            label="City"
            type="text"
          />
          <Input
            error={this.props.errors.county}
            value={this.props.values.county}
            onChange={this.props.handleChange('county')}
            placeholder="County"
            label="County"
            type="text"
          />
          <Input
            error={this.props.errors.postalCode}
            value={this.props.values.postalCode}
            onChange={this.props.handleChange('postalCode')}
            placeholder="Postal Code"
            label="Postal Code"
            type="text"
          />
          <Button
            text="Add address"
            type="success"
            onClick={this.props.handleSubmit}
          />
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postAddress: addressObj => dispatch(addressActions.postAddress(addressObj))
});

export default connect(
  null,
  mapDispatchToProps
)(enhancer(AddressForm));
