import React from 'react'
import TaskComponent from './TaskComponent'
import TaskHeader from './TaskHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function TaskBoard(props) {

  const project = props.project
  const tasks = props.tasks

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <TaskHeader project={project} />
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