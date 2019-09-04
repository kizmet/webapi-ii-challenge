export const POSTS_REQUESTED = "posts/POSTS_REQUESTED";
export const POSTS_RECEIVED = "posts/POSTS_RECEIVED";
export const POST_REQUESTED = "post/POST_REQUESTED";
export const POST_RECEIVED = "post/POST_RECEIVED";

const serverURL = "https://77eh0-5000.sse.codesandbox.io/";
const initialState = {
  posts: [],
  post: [],
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUESTED:
      return {
        ...state,
        isFetching: true
      };

    case POSTS_RECEIVED:
      return {
        ...state,
        posts: action.posts,
        isFetching: !state.isFetching
      };
    case POST_REQUESTED:
      return {
        ...state,
        isFetching: true
      };

    case POST_RECEIVED:
      return {
        ...state,
        post: action.post,
        isFetching: !state.isFetching
      };
    default:
      return state;
  }
};

export const fetchAsync = () => {
  return async dispatch => {
    dispatch({
      type: POSTS_REQUESTED
    });

    try {
      const res = await fetch(serverURL + "api/posts");
      const json = await res.json();
      dispatch({
        type: POSTS_RECEIVED,
        posts: json
      });
    } catch (err) {
      console.log("error occured", err);
    }
  };
};

export const fetchAsyncId = id => {
  return async dispatch => {
    dispatch({
      type: POST_REQUESTED
    });

    try {
      const res = await fetch(
        `https://77eh0-5000.sse.codesandbox.io/api/posts/${id}`
      );
      const json = await res.json();
      dispatch({
        type: POST_RECEIVED,
        post: json
      });
    } catch (err) {
      console.log("error occured", err);
    }
  };
};
