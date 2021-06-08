import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from "../../services/api"
import TaskPrincipal from '../../components/TaskPage/TaskPrincipal'
import TaskInfo from '../../components/TaskPage/TaskInfo'
import LinkBoard from "../../components/LinkPage/LinkBoard"
import { Loading } from '../../reusable'
import { fillComments } from '../../actions/comments'
import CommentBoard from '../../components/CommentPage/CommentBoard'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function Task({ match }) {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState(null)
  const comments = useSelector(state => state.comments)
  const links = useSelector(state => state.links)
  // const project = projects.find(project => project.id === task.id_project)

  useEffect(() => {
    api.get('task/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setTask(response.data.task)
          dispatch(fillComments(response.data.comments))
        } else {
          setTask([])
        }
        setLoading(false)
      })
  }, [match.params.id, dispatch])

  if (loading) return (<Loading />)

  return (
    <CRow>
      <CCol xs="12" sm="9" md="9">
        <TaskPrincipal task={task} />
        <CRow>
          <CCol xs="12" sm="6" md="6">
            <CommentBoard task={task} comments={comments} />
          </CCol>
          <CCol xs="12" sm="6" md="6">
            <LinkBoard links={links} />
          </CCol>
        </CRow>
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <TaskInfo task={task} />
      </CCol>
    </CRow>
  )
}