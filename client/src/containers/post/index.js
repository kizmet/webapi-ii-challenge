import React, { useEffect, useState } from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAsyncId } from "../../modules/posts";

const Home = ({ fetchAsyncId, isFetching, post, match }) => {
  const id = match.params.id;

  useEffect(() => {
    const loadData = id => fetchAsyncId(id);
    loadData(id);
  }, [fetchAsyncId, id]);
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {!isFetching && post.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ counter, posts }) => ({
  post: posts.post,
  isFetching: posts.isFetching
});

export default connect(
  mapStateToProps,
  { fetchAsyncId }
)(Home);
