import React, { Component } from 'react';

import { connect } from 'react-redux';
import { categoryActions, productActions } from '../store/actions';

import Select from '../components/Select';
import Card from '../components/Card';
import Button from '../components/Button';

class Filters extends Component {
  componentDidMount() {}

  render() {
    return (
      <Card>
        <Card.Header>
          <h5 className="card-header-title">Filters</h5>
        </Card.Header>
        <Card.Content>
          <Select
            label="Category"
            value={this.props.categoryFilter}
            onChange={e => this.props.setCategoryFilter(e.target.value)}
            options={this.props.categories.map(item => ({
              value: item.id,
              label: item.name
            }))}
          />
          <Select
            label="Price"
            value={this.props.sortFilter}
            onChange={e => this.props.setSortFilter(e.target.value)}
            options={[
              { value: -1, label: 'Ascendent' },
              { value: 1, label: 'Descendent' }
            ]}
          />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  categoryFilter: state.product.categoryFilter,
  sortFilter: state.product.sortFilter
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(categoryActions.getCategories()),
  setCategoryFilter: value => dispatch(productActions.setCategoryFilter(value)),
  setSortFilter: value => dispatch(productActions.setSortFilter(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
