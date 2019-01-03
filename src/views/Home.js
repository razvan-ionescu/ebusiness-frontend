import React, { Component } from 'react';

import { connect } from 'react-redux';
import { categoryActions } from '../store/actions';

import AppHOC from '../hoc/AppHOC';
import ProductList from '../containers/ProductList';

class Home extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return <ProductList />;
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(categoryActions.getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHOC(Home));
