import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAsync } from "../../modules/posts";

const Home = ({ fetchAsync, isFetching, posts, changePage }) => {
  useEffect(() => {
    const loadData = () => fetchAsync();
    loadData();
  }, [fetchAsync]);
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {!isFetching &&
          posts.map(post => (
            <li key={post.id} onClick={() => changePage(post.id)}>
              {post.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ counter, posts }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing,
  posts: posts.posts,
  isFetching: posts.isFetching
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: id => push(`/${id}`),
      fetchAsync
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
