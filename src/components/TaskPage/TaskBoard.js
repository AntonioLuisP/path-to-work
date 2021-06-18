import React from 'react'
import TaskComponent from './TaskComponent'
import TaskCreate from '../../views/tasks/TaskCreate'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function TaskBoard(props) {

  const tasks = props.tasks

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <BreadcrumbHeader title={props.title} component={<TaskCreate />} />
        {
          tasks.map(task => (
            <TaskComponent key={task.id} task={task} />
          ))
        }
      </CCol>
    </CRow>
  )
}