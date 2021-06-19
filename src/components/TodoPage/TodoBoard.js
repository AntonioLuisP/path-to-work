import React from 'react'
import TodoComponent from './TodoComponent'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

export default function TodoBoard(props) {

  const todos = props.todos

  return (
    <>
      <BreadcrumbHeader title={props.title} quantidade={todos.length} component={props.component} />
      <table className='table'>
        <tbody>
          {
            todos.map(todo => (
              <TodoComponent key={todo.id} todo={todo} />
            ))
          }
        </tbody>
      </table>
    </>
  )
}