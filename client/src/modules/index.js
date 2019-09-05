import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import posts from "./posts";
import comments from './comments'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  posts,
  comments
})

export default createRootReducer

// export default combineReducers({
//   posts,
//   comments
// });
