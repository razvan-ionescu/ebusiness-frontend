import React, { Component } from 'react';

import { connect } from 'react-redux';
import { productActions, orderActions } from '../store/actions';
import { createLoadingSelector, getVisibleProducts } from '../store/selectors';

import history from '../lib/history';

import Card from '../components/Card';
import Button from '../components/Button';

class ProductList extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const visibleProducts = getVisibleProducts(
      this.props.products,
      this.props.filters
    );
    const products = visibleProducts.length ? (
      visibleProducts.map(item => (
        <div key={item.id} className="column is-4-widescreen">
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
              <div className="content" style={{ wordBreak: 'break-word' }}>
                {item.description.substring(0, 140)}
                <br />
                RON {item.price}
              </div>
            </Card.Content>
            <Card.Footer>
              <Card.Footer.Item>
                <Button
                  type="primary"
                  text="Add to cart"
                  onClick={() =>
                    this.props.addItem({
                      productId: item.id,
                      quantity: 1,
                      name: item.name,
                      price: item.price
                    })
                  }
                />
              </Card.Footer.Item>
              <Card.Footer.Item>
                <Button
                  type="info"
                  text="See more"
                  onClick={() => history.push(`/products/${item.id}`)}
                />
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
  filters: {
    categoryFilter: state.product.categoryFilter,
    sortFilter: state.product.sortFilter
  },
  products: state.product.products,
  isLoading: createLoadingSelector(['GET_PRODUCTS'])(state)
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(productActions.getProducts()),
  addItem: productObj => dispatch(orderActions.addToCart(productObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
