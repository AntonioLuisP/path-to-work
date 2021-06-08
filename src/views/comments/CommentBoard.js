import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from "../../services/api"
import { fillComments } from '../../actions/comments'
import { modalAction } from '../../actions/modalAction'
import { CommentComponent } from '../../components'
import CommentCreate from './CommentCreate'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CRow,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function CommentBoard(props) {

  const dispatch = useDispatch()

  const task = props.task
  const comments = useSelector(state => state.comments)

  const toogleModal = () => {
    dispatch(modalAction(<CommentCreate task={task} />))
  }

  useEffect(() => {
    api.get('comment/' + '?id_task=' + task.id)
      .then(response => {
        if (response.status === 200) {
          dispatch(fillComments(response.data.data))
        }
      })
  }, [task.id, dispatch])

  return (
    <>
      <CBreadcrumb className="border-0 c-subheader-nav">
        <CBreadcrumbItem active>Comentários</CBreadcrumbItem>
        <CButton
          onClick={toogleModal}
        >
          <CIcon content={cilPlus} />
        </CButton>
      </CBreadcrumb>
      <CRow>
        {
          comments.map(comment => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        }
      </CRow>
    </>
  )
}