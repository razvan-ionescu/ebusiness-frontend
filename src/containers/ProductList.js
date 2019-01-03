import React, { Component } from 'react';

import { connect } from 'react-redux';
import { productActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import Card from '../components/Card';
import Button from '../components/Button';

class ProductList extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const products = this.props.products.length ? (
      this.props.products.map(item => (
        <div key={item.id} className="column is-3">
          <Card>
            <Card.Image>
              <figure className="image is-4by3">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${item.image}`}
                  alt={item.name}
                />
              </figure>
            </Card.Image>
            <Card.Header>
              <h5 className="card-header-title">{item.name}</h5>
            </Card.Header>
            <Card.Content>
              <div className="content">
                {item.description}
                <br />
                RON {item.price}
              </div>
            </Card.Content>
            <Card.Footer>
              <Card.Footer.Item>
                <Button type="primary" text="Add to cart" />
              </Card.Footer.Item>
            </Card.Footer>
          </Card>
        </div>
      ))
    ) : (
      <p>No products to display.</p>
    );

    return <div className="columns">{products}</div>;
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
