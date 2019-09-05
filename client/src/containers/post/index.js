import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAsyncId } from '../../modules/posts'
import { fetchAsyncComments } from '../../modules/comments'
import { Comment, Tooltip, List, Descriptions } from 'antd'
import AddComment from './AddComment'

const Post = ({  match }) => {
  const id = match.params.id
  const dispatch = useDispatch()
  const post = useSelector(state => state.posts.post)
  const isFetching = useSelector(state => state.posts.isFetching)
  const isCommentFetching = useSelector(
    state => state.comments.isCommentFetching
  )
  const comments = useSelector(state => state.comments.comments)
  const isAdding = useSelector(state => state.comments.isAdding)


  useEffect(() => {
    const loadData = id => dispatch(fetchAsyncId(id))
    loadData(id)
  }, [fetchAsyncId, id])

  useEffect(() => {
    const loadComments = id => dispatch(fetchAsyncComments(id))
    loadComments(id)
  }, [id, fetchAsyncComments, isAdding])

  return (
    <div>
      <h1>{`Post # ${id}`}</h1>
      
        {!isFetching &&
          post.map(post => (
            <Descriptions title="Post Comments">
              <Descriptions.Item label="Title">{post.title}</Descriptions.Item>
              <Descriptions.Item label="Contents">
                {post.contents}
              </Descriptions.Item>
            </Descriptions>
          ))}
      <List
        className="comment-list"
        header={`${comments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <li>
            <Comment
              author={item.id}
              avatar={'https://static.thenounproject.com/png/82766-200.png'}
              content={item.text}
              datetime={item.created_at}
            />
          </li>
        )}
      />
      <AddComment id={id}/>
    </div>
  )
}

export default Post
