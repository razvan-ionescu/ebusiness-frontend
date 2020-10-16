import React, { Component } from 'react';

import * as yup from 'yup';
import { withFormik } from 'formik';

import { connect } from 'react-redux';
import { authActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const enhancer = withFormik({
  mapPropsToValues: props => ({
    email: props.currentUser.email || '',
    name: props.currentUser.client.name || '',
    surname: props.currentUser.client.surname || ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    name: yup.string().required(),
    surname: yup.string().required()
  }),
  handleSubmit: (values, { props }) => {
    props.patchUser({
      user: {
        email: values.email,
        password: values.password
      },
      client: {
        name: values.name,
        surname: values.surname
      }
    });
  }
});

class Register extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <h5 className="card-header-title">Detalii utilizator</h5>
        </Card.Header>
        <Card.Content>
          <Input
            error={this.props.errors.email}
            value={this.props.values.email}
            onChange={this.props.handleChange('email')}
            placeholder="E-mail"
            label="E-mail"
            type="email"
          />
          <Input
            error={this.props.errors.name}
            value={this.props.values.name}
            onChange={this.props.handleChange('name')}
            placeholder="Nume de familie"
            label="Nume"
            type="text"
          />
          <Input
            error={this.props.errors.surname}
            value={this.props.values.surname}
            onChange={this.props.handleChange('surname')}
            placeholder="Nume propriu"
            label="Prenume"
            type="text"
          />
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            <Button
              loading={this.props.isLoading}
              text="Salveaza"
              type="primary"
              disabled={this.props.isSubmitting}
              onClick={this.props.handleSubmit}
            />
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: createLoadingSelector(['PATCH_USER'])(state)
});

const mapDispatchToProps = dispatch => ({
  patchUser: userObj => dispatch(authActions.patchUser(userObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhancer(Register));
