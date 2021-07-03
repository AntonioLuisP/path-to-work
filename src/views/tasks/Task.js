import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { BreadcrumbHeader, Loading, Modal, NoItems, PrincipalButtons, CollapseDescription } from '../../reusable'
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
  CCollapse
} from '@coreui/react'

export default function Task() {

  const { id } = useParams();
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const [task, setTask] = useState({})
  const [links, setLinks] = useState([])
  const [todos, setTodos] = useState([])

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
      setTask(task)
      const { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .eq('task_id', id)
      if (error) {
        console.log("error", error);
      }
      else {
        setTodos(todos)
      }
      setLinks([])
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchTask()
  }, [fetchTask])

  async function handleDelete() {
    if (window.confirm('Tem certeza que você deseja excluir?')) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
      if (error) console.log("error", error);
      else history.push('/tasks');
    }
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<TaskEdit task={task} edit={task => setTask(task)} />} />
      <CCol xs="12" sm="9" md="9">
        <CCard className='text-break text-justify'>
          <CCardHeader color="secondary">
            {task.name}
          </CCardHeader>
          <CCollapse show={collapsed}>
            <CCardBody>
              {task.description === '' ? 'Sem Descrição' : task.description}
            </CCardBody>
          </CCollapse>
        </CCard>
        <CRow>
          <CCol xs="12" sm="6" md="6">
            <BreadcrumbHeader title='Afazeres' quantidade={todos.length} component={<TodoCreate task={task} add={todo => setTodos([...todos, todo])} />} />
            {todos <= 0 ? <NoItems /> :
              todos.map(todo => (<TodoComponent key={todo.id} todo={todo} />))
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
        <TaskInfo task={task}>
          <div className="card-header-actions">
            <CollapseDescription status={collapsed} action={() => setCollapsed(!collapsed)} />
            <PrincipalButtons editAction={() => toogleModal()} deleteAction={() => handleDelete(task.id)} />
          </div>
        </TaskInfo>
        <TaskStatus task={task} todos={todos.length} links={links.length} />
      </CCol>
    </CRow>
  )
}