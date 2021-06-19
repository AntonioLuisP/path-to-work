import React from 'react'
import CommentComponent from './CommentComponent'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

import {
  CCard,
  CCardBody,
} from '@coreui/react'

export default function CommentBoard(props) {

  const comments = props.comments

  return (
    <>
      <BreadcrumbHeader title={props.title} quantidade={comments.length} component={props.component} />
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