import React from 'react'
import TodoComponent from './TodoComponent'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function TodoBoard(props) {

  const todos = props.todos

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <BreadcrumbHeader title={props.title} quantidade={todos.length} component={props.component} />
        {
          todos.map(todo => (
            <TodoComponent key={todo.id} todo={todo} />
          ))
        }
      </CCol>
    </CRow>
  )
}