import React from 'react'
import CommentComponent from './CommentComponent'
import CommentCreate from '../../views/comments/CommentCreate'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

import {
  CCard,
  CCardBody,
} from '@coreui/react'

export default function CommentBoard(props) {

  const task = props.task
  const comments = props.comments

  return (
    <>
      <BreadcrumbHeader title='Comentários' component={<CommentCreate task={task} />} />
      <CCard>
        <CCardBody height='80rm'>
          {
            comments.map(comment => (
              <CommentComponent key={comment.id} comment={comment} />
            ))
          }
        </CCardBody>
      </CCard>
    </>
  )
}