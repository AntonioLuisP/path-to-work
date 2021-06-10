import React from 'react'
import TodoComponent from './TodoComponent'
import TodoHeader from './TodoHeader'

export default function TodoBoard(props) {

  const task = props.task
  const todos = props.todos

  return (
    <>
      <TodoHeader task={task} />
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