import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Input, Button} from 'react-materialize';
import { connect } from 'react-redux';
import { fetchPosts } from '../../../redux/actions/postActions';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <Col s={12} key={post.id}>
         <Card textClassName='black-text' title={post.title}>
            <p>{post.body}</p>
         </Card>
      </Col>
    ));
    return (
      <div className="container">
        <h4>Posts</h4>
        <hr />
        <br/>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);