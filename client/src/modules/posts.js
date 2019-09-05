export const POSTS_REQUESTED = 'posts/POSTS_REQUESTED'
export const POSTS_RECEIVED = 'posts/POSTS_RECEIVED'
export const POST_REQUESTED = 'post/POST_REQUESTED'
export const POST_RECEIVED = 'post/POST_RECEIVED'
export const POST_UPDATE_REQUESTED = 'post/POST_UPDATE_REQUESTED'
export const POST_UPDATE_RECEIVED = 'post/POST_UPDATE_RECEIVED'
export const ADD_POST_REQUESTED = 'post/ADD_POST_REQUESTED'
export const ADD_POST_RECEIVED = 'post/ADD_POST_RECEIVED'
export const DEL_POST_REQUESTED = 'post/DEL_POST_REQUESTED'
export const DEL_POST_RECEIVED = 'post/DEL_POST_RECEIVED'



//const serverURL = "https://77eh0-5000.sse.codesandbox.io/";
const serverURL = 'http://localhost:5000/'

const initialState = {
  posts: [],
  post: [],
  isFetching: false,
  isUpdating: false,
  isAdding: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUESTED:
      return {
        ...state,
        isFetching: true
      }

    case POSTS_RECEIVED:
      return {
        ...state,
        posts: action.posts,
        isFetching: !state.isFetching
      }
    case POST_REQUESTED:
      return {
        ...state,
        isFetching: true
      }

    case POST_RECEIVED:
      return {
        ...state,
        post: action.post,
        isFetching: !state.isFetching
      }
    case POST_UPDATE_REQUESTED:
      return {
        ...state,
        isUpdating: true
      }

    case POST_UPDATE_RECEIVED:
      return {
        ...state,
        isUpdating: !state.isFetching
      }
    case ADD_POST_REQUESTED:
      return {
        ...state,
        isAdding: true
      }

    case ADD_POST_RECEIVED:
      return {
        ...state,
        isAdding: !state.isFetching
      }

    default:
      return state
  }
}

export const fetchAsync = () => {
  return async dispatch => {
    dispatch({
      type: POSTS_REQUESTED
    })

    try {
      const res = await fetch(serverURL + 'api/posts')
      const json = await res.json()
      dispatch({
        type: POSTS_RECEIVED,
        posts: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const fetchAsyncId = id => {
  return async dispatch => {
    dispatch({
      type: POST_REQUESTED
    })

    try {
      const res = await fetch(serverURL + `api/posts/${id}`)
      const json = await res.json()
      dispatch({
        type: POST_RECEIVED,
        post: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const updateAsyncId = post => {
  return async dispatch => {
    dispatch({
      type: POST_UPDATE_REQUESTED
    })
    const id = post.id
    const body = { title: post.title, contents: post.contents }
    try {
      const res = await fetch(serverURL + `api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
      const json = await res.json()
      dispatch({
        type: POST_UPDATE_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const addAsync = post => {
  return async dispatch => {
    dispatch({
      type: ADD_POST_REQUESTED
    })
    try {
      const res = await fetch(serverURL + 'api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
      const json = await res.json()
      dispatch({
        type: ADD_POST_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}


export const deleteAsync = id => {
  return async dispatch => {
    dispatch({
      type: DEL_POST_REQUESTED
    })
    try {
      const res = await fetch(serverURL + `api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      dispatch({
        type: DEL_POST_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}