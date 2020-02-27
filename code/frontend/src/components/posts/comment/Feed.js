import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item";
class Feed extends Component {
  render() {
    const { comments, postId } = this.props;
    return comments.map(comment => (
      <Item key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

Feed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default Feed;
