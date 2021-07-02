import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Actions as ActionTask } from '../../redux/task'
import { Actions as ActionLink } from '../../redux/link'
import { Actions as ActionTodo } from '../../redux/todo'
import { BreadcrumbHeader, DropdownMore, Loading, Modal, NoItems } from '../../reusable'
import { LinkComponent, TodoComponent, TaskStatus, TaskInfo } from "../../components/"
import LinkCreate from '../links/LinkCreate'
import TodoCreate from '../todos/TodoCreate'
import TaskEdit from './TaskEdit'
import { supabase } from '../../services/supabase'

import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'

export default function Task() {

  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const task = useSelector(state => state.task)

  const links = useSelector(state => state.links)
  const todos = useSelector(state => state.todos)

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchTask = useCallback(async () => {
    const { data: task, error } = await supabase
      .from("tasks")
      .select("*")
      .eq('id', id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      dispatch(ActionTask.selectOne(task))
      dispatch(ActionLink.fillSome([]))
      dispatch(ActionTodo.fillSome([]))
    }
    setLoading(false)
  }, [id, dispatch])

  useEffect(() => {
    fetchTask()
    return () => {
      dispatch(ActionTask.removeSelected())
    }
  }, [fetchTask, dispatch])

  async function handleDelete() {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    if (error) console.log("error", error);
    else history.push('/tasks');
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<TaskEdit task={task} />} />
      <CCol xs="12" sm="9" md="9">
        <CCard className='text-break text-justify'>
          <CCardHeader color="secondary">
            {task.name}
            <div className="card-header-actions">
              <DropdownMore
                editAction={() => toogleModal()}
                deleteAction={() => handleDelete(task.id)}
              />
            </div>
          </CCardHeader>
          <CCardBody>
            {task.description}
          </CCardBody>
        </CCard>
        <CRow>
          <CCol xs="12" sm="6" md="6">
            <BreadcrumbHeader title='Afazeres' quantidade={todos.length} component={<TodoCreate task={task} />} />
            {todos <= 0 ? <NoItems /> :
              links.map(todo => (<TodoComponent key={todo.id} todo={todo} />))
            }
          </CCol>
          <CCol xs="12" sm="6" md="6">
            <BreadcrumbHeader title='Links' quantidade={links.length} component={<LinkCreate />} />
            {links <= 0 ? <NoItems /> :
              links.map(link => (<LinkComponent key={link.id} link={link} />))
            }
          </CCol>
        </CRow>
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <TaskStatus task={task} todos={todos.length} links={links.length} />
        <TaskInfo task={task} />
      </CCol>
    </CRow>
  )
}