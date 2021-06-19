import React from 'react'
import TodoComponent from './TodoComponent'
import TodoCreate from '../../views/todos/TodoCreate'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

export default function TodoBoard(props) {

  const todos = props.todos

  return (
    <>
      <BreadcrumbHeader title={props.title} quantidade={todos.length} component={<TodoCreate task={props.task} />} />
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