import React, { Component } from 'react';

import * as yup from 'yup';
import { withFormik } from 'formik';

import { connect } from 'react-redux';
import { orderActions, addressActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import AppHOC from '../hoc/AppHOC';

import Select from '../components/Select';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';

const enhancer = withFormik({
  mapPropsToValues: props => ({
    deliveryAddressId: '',
    receiptAddressId: ''
  }),
  validationSchema: yup.object({
    deliveryAddressId: yup.string().required(),
    receiptAddressId: yup.string().required()
  }),
  handleSubmit: (values, { props, resetForm }) => {
    console.log("am apasat butonul");
    props.postOrder({ ...values, products: [...props.currentOrder.products] });
    resetForm();
  }
});

class Checkout extends Component {
  componentDidMount() {
    this.props.getAddresses();
  }
  render() {
    return (
      <Card>
        <Card.Header>
          <Select
            label="Adresa de livrare"
            loading={this.props.loading}
            value={this.props.values.deliveryAddressId}
            options={this.props.addresses.map(item => ({
              label: item.street,
              value: item.id
            }))}
            onChange={e =>
              this.props.setFieldValue('deliveryAddressId', e.target.value)
            }
          />
          <Select
            label="Adresa de facturare"
            loading={this.props.loading}
            value={this.props.values.receiptAddressId}
            options={this.props.addresses.map(item => ({
              label: item.street,
              value: item.id
            }))}
            onChange={e =>
              this.props.setFieldValue('receiptAddressId', e.target.value)
            }
          />
        </Card.Header>
        <Card.Content>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nume</Table.HeaderCell>
                <Table.HeaderCell>Cantitate (bucati)</Table.HeaderCell>
                <Table.HeaderCell>Pret (lei)</Table.HeaderCell>
                <Table.HeaderCell>Total (lei)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              
              {this.props.currentOrder.products.length ? (
                this.props.currentOrder.products.map(item => (
                  <Table.Row key={item.productId}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>{item.quantity * item.price}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>Cosul de cumparaturi este gol.</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell>Cantitate totala {this.props.currentOrder.products.map(item => item.quantity).reduce((a, b) => a + b, 0)}.</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Button
                    text="Plateste"
                    type="primary"
                    onClick={this.props.handleSubmit}
                  />
                </Table.Cell>
              </Table.Row>
              
            </Table.Footer>
          </Table>
          
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  loading: createLoadingSelector(['GET_ADDRESSES'])(state),
  addresses: state.address.addresses,
  currentOrder: state.order.currentOrder
});

const mapDispatchToProps = dispatch => ({
  postOrder: orderObj => dispatch(orderActions.postOrder(orderObj)),
  getAddresses: () => dispatch(addressActions.getAddresses())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhancer(AppHOC(Checkout)));
