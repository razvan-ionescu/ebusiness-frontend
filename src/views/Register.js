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
  mapPropsToValues: () => ({
    email: '',
    password: '',
    name: '',
    surname: ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
    name: yup.string().required(),
    surname: yup.string().required()
  }),
  handleSubmit: (values, { props, resetForm }) => {
    props.register({
      user: {
        email: values.email,
        password: values.password
      },
      client: {
        name: values.name,
        surname: values.surname
      }
    });
    resetForm();
  }
});

class Register extends Component {
  render() {
    return (
      <div
        className="container is-flex"
        style={{ height: '100vh', justifyContent: 'center' }}
      >
        <div
          className="columns is-centered"
          style={{ alignItems: 'center', width: '100%' }}
        >
          <div className="column is-one-third">
            <Card>
              <Card.Header>
                <h5 className="card-header-title">Register</h5>
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
                  error={this.props.errors.password}
                  value={this.props.values.password}
                  onChange={this.props.handleChange('password')}
                  placeholder="Alegeti o parola puternica"
                  label="Parola"
                  type="password"
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
                  placeholder="Numele propriu"
                  label="Prenume"
                  type="text"
                />
              </Card.Content>
              <Card.Footer>
                <Card.Footer.Item>
                  <Button
                    loading={this.props.isLoading}
                    text="Inregistrare"
                    type="primary"
                    disabled={this.props.isSubmitting}
                    onClick={this.props.handleSubmit}
                  />
                </Card.Footer.Item>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: createLoadingSelector(['REGISTER'])(state)
});

const mapDispatchToProps = dispatch => ({
  register: registerObj => dispatch(authActions.register(registerObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhancer(Register));
