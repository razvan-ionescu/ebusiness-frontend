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
    postalCode: '',
    phoneNumber: ''
  }),
  validationSchema: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    county: yup.string().required(),
    postalCode: yup.string().required(),
    phoneNumber: yup.string().required()
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
        <Card.Header>
          <h5 className="card-header-title">Adresa</h5>
        </Card.Header>
        <Card.Content>
          <Input
            error={this.props.errors.street}
            value={this.props.values.street}
            onChange={this.props.handleChange('street')}
            placeholder="Strada, Bloc, Etaj, Apartament"
            label="Strada"
            type="text"
          />
          <Input
            error={this.props.errors.city}
            value={this.props.values.city}
            onChange={this.props.handleChange('city')}
            placeholder="Oras"
            label="Oras"
            type="text"
          />
          <Input
            error={this.props.errors.county}
            value={this.props.values.county}
            onChange={this.props.handleChange('county')}
            placeholder="Judet/Sector"
            label="Judet/Sector"
            type="text"
          />
          <Input
            error={this.props.errors.postalCode}
            value={this.props.values.postalCode}
            onChange={this.props.handleChange('postalCode')}
            placeholder="Cod Postal din 6 cifre"
            label="Cod Postal"
            type="text"
          />
          <Input
            error={this.props.errors.phoneNumber}
            value={this.props.values.phoneNumber}
            onChange={this.props.handleChange('phoneNumber')}
            placeholder="eg: 0722123456"
            label="Numar de telefon"
            type="text"
          />
          <Button
            text="Adauga adresa"
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
