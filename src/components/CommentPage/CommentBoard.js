import React from 'react'
import CommentComponent from './CommentComponent'
import CommentHeader from './CommentHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function CommentBoard(props) {

  const task = props.task
  const comments = props.comments

  return (
    <>
      <CommentHeader task={task} />
      <CRow>
        <CCol>
          {
            comments.map(comment => (
              <CommentComponent key={comment.id} comment={comment} />
            ))
          }
        </CCol>
      </CRow>
    </>
  )
}