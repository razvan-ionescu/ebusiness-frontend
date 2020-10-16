import React, { Component } from 'react';

import { DateTime } from 'luxon';

import { connect } from 'react-redux';
import { orderActions } from '../store/actions';

import Table from '../components/Table';

class OrderList extends Component {
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status Comanda</Table.HeaderCell>
            <Table.HeaderCell>Data Comenzii</Table.HeaderCell>
            <Table.HeaderCell>Cost Comanda</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Numar comenzi: {this.props.orders.length}</Table.Cell>
          </Table.Row>
          {this.props.orders.length ? (
            this.props.orders.map(item => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.status}</Table.Cell>
                <Table.Cell>
                  {DateTime.fromISO(item.createdAt).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </Table.Cell>
                <Table.Cell>
                  {item.products.reduce(
                    (acc, val) =>
                      (acc += val.order_product.quantity * val.price),
                    0
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>Nu exista nici o comanda.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders
});

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(orderActions.getOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
