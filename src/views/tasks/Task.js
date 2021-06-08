import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import api from "../../services/api"
import { TaskPrincipal } from '../../components/TaskPage'
import LinkBoard from "../links/LinkBoard"
import { Loading } from '../../reusable'

import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import CommentBoard from '../comments/CommentBoard'

export default function Task({ match }) {

  const [task, setTask] = useState(null)
  // const projects = useSelector(state => state.projects)
  // const project = projects.find(project => project.id === task.id_project)

  useEffect(() => {
    api.get('task/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setTask(response.data.task)
        } else {
          setTask([])
        }
      })
  }, [match.params.id])

  if (task === null) return (<Loading />)

  return (
    <CRow>
      <CCol xs="12" sm="9" md="9">
        <TaskPrincipal task={task} />
        <CRow>
          <CCol xs="12" sm="6" md="6">
            <CommentBoard task={task} />
          </CCol>
          <CCol xs="12" sm="6" md="6">
            <LinkBoard />
          </CCol>
        </CRow>
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <CCard>
          <CCardHeader>
            Informações
          </CCardHeader>
          {/* <CListGroupItem>
            Pertence ao Projeto: {project.name}
          </CListGroupItem> */}
          <CListGroupItem>
            Data limite: {task.limite_date}
          </CListGroupItem>
          <CListGroupItem>
            Criado em: {task.created_at}
          </CListGroupItem>
          <CListGroupItem>
            Editado em: {task.updated_at}
          </CListGroupItem>
        </CCard>
        <CCard accentColor='info'>
          <CCardHeader>
            Comentar
            </CCardHeader>
          <CCardBody>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}