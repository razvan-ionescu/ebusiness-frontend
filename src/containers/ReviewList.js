import React, { Component } from 'react';

import { connect } from 'react-redux';
import { reviewActions } from '../store/actions';

import Card from '../components/Card';

class ReviewList extends Component {
  componentDidMount() {
    this.props.getReviews(this.props.productId);
  }
  render() {
    return (
      <Card>
        <Card.Content>
          {this.props.reviews.length
            ? this.props.reviews.map(item => (
                <article key={item.id} className="media">
                  <div className="media-content">
                    <strong>
                      {item.client.name} {item.client.surname}
                    </strong>
                    <br />
                    Score: {item.score}/5 <br />
                    {item.content}
                  </div>
                </article>
              ))
            : null}
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.review.reviews
});

const mapDispatchToProps = dispatch => ({
  getReviews: id => dispatch(reviewActions.getReviews(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewList);
