import React, { Component } from 'react';

import { connect } from 'react-redux';
import { productActions, orderActions } from '../store/actions';
import { createLoadingSelector } from '../store/selectors';

import AppHOC from '../hoc/AppHOC';

import ReviewList from '../containers/ReviewList';
import ReviewForm from '../containers/ReviewForm';

import Button from '../components/Button';
import Card from '../components/Card';

class ProductDetail extends Component {
  state = {
    currentProduct: null
  };

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { currentProduct } = this.props;
    if (!currentProduct) return null;
    return (
      <div className="columns">
        <div className="column">
          <Card>
            <Card.Image>
              <figure className="image is-4by3">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${
                    currentProduct.image
                  }`}
                  alt={currentProduct.name}
                />
              </figure>
            </Card.Image>
            <Card.Header>
              <h5 className="card-header-title">{currentProduct.name}</h5>
            </Card.Header>
            <Card.Content>
              <div className="content">
                {currentProduct.description}
                <br />
                RON {currentProduct.price}
              </div>
            </Card.Content>
            <Card.Footer>
              <Card.Footer.Item>
                <Button
                  type="primary"
                  text="Add to cart"
                  onClick={() =>
                    this.props.addItem({
                      productId: this.props.currentProduct.id,
                      quantity: 1,
                      name: this.props.currentProduct.name,
                      price: this.props.currentProduct.price
                    })
                  }
                />
              </Card.Footer.Item>
            </Card.Footer>
          </Card>
        </div>
        <div className="column">
          <ReviewList productId={this.props.match.params.id} />
          {this.props.authenticated ? (
            <ReviewForm productId={this.props.match.params.id} />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentProduct: state.product.currentProduct,
  loading: createLoadingSelector(['GET_PRODUCT'])(state),
  authenticated: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(productActions.getProduct(id)),
  addItem: productObj => dispatch(orderActions.addToCart(productObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHOC(ProductDetail));
