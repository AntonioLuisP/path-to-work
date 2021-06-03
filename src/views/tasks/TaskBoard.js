import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { SeeMore } from '../../reusable'
import TaskCreate from './TaskCreate'

import {
  CButton,
  CBreadcrumb,
  CBreadcrumbItem,
  CCard,
  CCardHeader,
  CCol,
  CModal,
  CRow,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskBoard(props) {

  const history = useHistory()

  const [project, setProject] = useState('')
  const [modal, setModal] = useState(false)

  //lista
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(props.lista)
    setProject(props.project)
  }, [props.project, props.lista])

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Tarefas</CBreadcrumbItem>
          <CButton
            onClick={() => setModal(!modal)}
          >
            <CIcon content={cilPlus} />
          </CButton>
          <CModal
            show={modal}
            onClose={setModal}
          >
            <TaskCreate project={project} />
          </CModal>
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