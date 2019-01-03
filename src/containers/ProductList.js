import React, { Component } from 'react';

import { connect } from 'react-redux';
import { productActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Card from '../components/Card';

class ProductList extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const products = this.props.products.length ? (
      this.props.products.map(item => (
        <Card key={item.id}>
          <Card.Header>
            <h5 className="card-header-title">{item.name}</h5>
          </Card.Header>
        </Card>
      ))
    ) : (
      <p>No products to display.</p>
    );

    return <React.Fragment>{products}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
  isLoading: createLoadingSelector(['GET_PRODUCTS'])(state)
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(productActions.getProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
