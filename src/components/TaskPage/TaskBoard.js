import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fillTasks } from '../../actions/tasks'
import api from "../../services/api"
import TaskCreate from '../../views/tasks/TaskCreate'
import { modalAction } from '../../actions/modalAction'
import TaskComponent from './TaskComponent'

import {
  CButton,
  CBreadcrumb,
  CBreadcrumbItem,
  CCol,
  CRow,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskBoard(props) {

  const dispatch = useDispatch()

  const project = props.project
  const tasks = useSelector(state => state.tasks)

  const toogleModal = () => {
    dispatch(modalAction(<TaskCreate project={project} />))
  }

  useEffect(() => {
    api.get('task/' + '?id_project=' + project.id)
      .then(response => {
        if (response.status === 200) {
          dispatch(fillTasks(response.data.data))
        }
      })
  }, [project.id, dispatch])

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Tarefas</CBreadcrumbItem>
          <CButton
            onClick={toogleModal}
          >
            <CIcon content={cilPlus} />
          </CButton>
        </CBreadcrumb>
        <CRow>
          {
            tasks.map(task => (
              <TaskComponent key={task.id} task={task} />
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}