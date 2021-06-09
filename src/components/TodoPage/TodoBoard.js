import React from 'react'
import TodoComponent from './TodoComponent'
import TodoHeader from './TodoHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function TodoBoard(props) {

  const task = props.task
  const todos = props.todos

  return (
    <>
      <TodoHeader task={task} />
      <CRow>
        <CCol xs="12" sm="12" md="12">
          {
            todos.map(todo => (
              <TodoComponent key={todo.id} todo={todo} />
            ))
          }
        </CCol>
      </CRow>
    </>
  )
}