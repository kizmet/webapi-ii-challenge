export const COMMENTS_REQUESTED = 'comments/COMMENTS_REQUESTED'
export const COMMENTS_RECEIVED = 'comments/COMMENTS_RECEIVED'
export const COMMENT_REQUESTED = 'comment/COMMENT_REQUESTED'
export const COMMENT_RECEIVED = 'comment/COMMENT_RECEIVED'
export const COMMENT_UPDATE_REQUESTED = 'comment/COMMENT_UPDATE_REQUESTED'
export const COMMENT_UPDATE_RECEIVED = 'comment/COMMENT_UPDATE_RECEIVED'
export const ADD_COMMENT_REQUESTED = 'comment/ADD_COMMENT_REQUESTED'
export const ADD_COMMENT_RECEIVED = 'comment/ADD_COMMENT_RECEIVED'
export const DEL_COMMENT_REQUESTED = 'comment/DEL_COMMENT_REQUESTED'
export const DEL_COMMENT_RECEIVED = 'comment/DEL_COMMENT_RECEIVED'

//const serverURL = "https://77eh0-5000.sse.codesandbox.io/";
const serverURL = 'http://localhost:5000/'

const initialState = {
  comments: [],
  comment: [],
  isCommentFetching: false,
  isUpdating: false,
  isAdding: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUESTED:
      return {
        ...state,
        isCommentFetching: true
      }

    case COMMENTS_RECEIVED:
      return {
        ...state,
        comments: action.comments,
        isCommentFetching: !state.isCommentFetching
      }
    case COMMENT_REQUESTED:
      return {
        ...state,
        isCommentFetching: true
      }

    case COMMENT_RECEIVED:
      return {
        ...state,
        comment: action.comment,
        isCommentFetching: !state.isCommentFetching
      }
    case COMMENT_UPDATE_REQUESTED:
      return {
        ...state,
        isUpdating: true
      }

    case COMMENT_UPDATE_RECEIVED:
      return {
        ...state,
        isUpdating: !state.isCommentFetching
      }
    case ADD_COMMENT_REQUESTED:
      return {
        ...state,
        isAdding: true
      }

    case ADD_COMMENT_RECEIVED:
      return {
        ...state,
        isAdding: !state.isCommentFetching
      }

    default:
      return state
  }
}

export const fetchAsyncComments = id => {
  return async dispatch => {
    dispatch({
      type: COMMENTS_REQUESTED
    })

    try {
      const res = await fetch(serverURL + `api/posts/${id}/comments`)
      const json = await res.json()
      dispatch({
        type: COMMENTS_RECEIVED,
        comments: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const fetchAsyncIdComment = id => {
  return async dispatch => {
    dispatch({
      type: COMMENT_REQUESTED
    })

    try {
      const res = await fetch(serverURL + `api/posts/${id}/comments`)
      const json = await res.json()
      dispatch({
        type: COMMENT_RECEIVED,
        comment: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const updateAsyncComment = comment => {
  return async dispatch => {
    dispatch({
      type: COMMENT_UPDATE_REQUESTED
    })
    const id = comment.id
    const body = { title: comment.title, contents: comment.contents }
    try {
      const res = await fetch(serverURL + `api/posts/${id}/comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      const json = await res.json()
      dispatch({
        type: COMMENT_UPDATE_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const addAsyncComment = (id, comment, setSubmitting) => {
  return async dispatch => {
    dispatch({
      type: ADD_COMMENT_REQUESTED
    })
    try {
      const res = await fetch(serverURL + `api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      const json = await res.json()
      dispatch({
        type: ADD_COMMENT_RECEIVED,
      })
      setSubmitting(false)
    } catch (err) {
      console.log('error occured', err)
    }
  }
}



export const deleteAsyncComment = id => {
  return async dispatch => {
    dispatch({
      type: DEL_COMMENT_REQUESTED
    })
    try {
      const res = await fetch(serverURL + `api/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      dispatch({
        type: DEL_COMMENT_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}