import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import TodoIndex from '../todos/TodoIndex'
import TaskEdit from './TaskEdit'
import TaskLinksIndex from '../taskLink/TaskLinksIndex';

import {
  Loading,
  Modal,
  NoData,
  PrincipalButtons,
  CollapseDescription
} from '../../reusable'

import {
  TaskStatus,
  TaskInfo
} from "../../components/"

import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CCollapse,
} from '@coreui/react'

export default function Task() {

  const { id } = useParams();
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const [task, setTask] = useState({})
  const [todosQtd, setTodosQtd] = useState(0)
  const [linksQtd, setLinksQtd] = useState(0)

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchTask = useCallback(async () => {
    setLoading(true)
    setTask({})
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
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchTask()
  }, [fetchTask])

  async function handleDelete() {
    if (window.confirm('Tem certeza que você deseja excluir?')) {
      const { errorTaskLinks } = await supabase
        .from('task_links')
        .delete()
        .eq('task_id', id)
      if (errorTaskLinks) {
        console.log("errorTaskLinks", errorTaskLinks)
      } else {
        const { errorTodos } = await supabase
          .from('todos')
          .delete()
          .eq('task_id', id)
        if (errorTodos) {
          console.log("errorTodos", errorTodos)
        } else {
          const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)
          if (error) console.log("error", error);
          else history.push('/tasks');
        }
      }
    }
  }

  if (loading) return (<Loading />)

  if (task.id === undefined) return (<NoData />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal}>
        <TaskEdit task={task} edit={task => setTask(task)} />
      </Modal>
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
            <TodoIndex taskId={task.id} todosQtd={qtd => setTodosQtd(qtd)} />
          </CCol>
          <CCol xs="12" sm="6" md="6">
            <TaskLinksIndex taskId={task.id} linksQtd={qtd => setLinksQtd(qtd)} />
          </CCol>
        </CRow>
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <TaskInfo task={task} buttons={
          <div className="card-header-actions">
            <CollapseDescription status={collapsed} action={() => setCollapsed(!collapsed)} />
            <PrincipalButtons editAction={() => toogleModal()} deleteAction={() => handleDelete(task.id)} />
          </div>
        } />
        <TaskStatus task={task} todos={todosQtd} links={linksQtd} />
      </CCol>
    </CRow>
  )
}