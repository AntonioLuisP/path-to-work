import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fillTasks } from '../../actions/tasks'
import { SeeMore } from '../../reusable'
import api from "../../services/api"
import TaskCreate from './TaskCreate'
import { modalAction } from '../../actions/modalAction'

import {
  CButton,
  CBreadcrumb,
  CBreadcrumbItem,
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskIndex(props) {

  const history = useHistory()
  const dispatch = useDispatch()

  const tasks = useSelector(state => state.tasks)

  const toogleModal = () => {
    dispatch(modalAction(<TaskCreate />))
  }

  useEffect(() => {
    api.get('task')
      .then(response => {
        if (response.status === 200) {
          dispatch(fillTasks(response.data.data))
        }
      })
  }, [dispatch])

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
              <CCol xs="12" sm="6" md="6" key={task.id}>
                <CCard>
                  <CCardHeader>
                    {task.name}
                    <div className="card-header-actions">
                      <SeeMore to={() => { history.push('/tasks/' + task.id) }} />
                    </div>
                  </CCardHeader>
                </CCard>
              </CCol>
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}