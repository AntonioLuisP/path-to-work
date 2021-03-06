import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import TodoIndex from '../todos/TodoIndex'
import TaskEdit from './TaskEdit'
import TaskLinksIndex from '../taskLink/TaskLinksIndex';

import {
  Loading,
  Modal,
  Error,
  PrincipalButtons,
  Principal,
  ConclusionSwitch,
  CollapseDescription
} from '../../reusable'

import {
  TaskStatus,
  TaskInfo
} from "../../components/"

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function Task() {

  const { id } = useParams();
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
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
    try {
      const { data: task, error } = await supabase
        .from("tasks")
        .select("*")
        .eq('id', id)
        .single()
      if (error) {
        setErrors(prev => [...prev, error.message])
      }
      else {
        setTask(task)
      }
    } catch (error) {
      setErrors(prev => [...prev, error.message])
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchTask()
  }, [fetchTask])

  async function handleDelete() {
    try {
      const { errorRelation } = await supabase
        .from('task_links')
        .delete()
        .eq('task_id', id)
      if (errorRelation) {
        alert("Não foi possivel apagar a informação. Motivo: ", errorRelation.message)
        return;
      }
      const { errorTodos } = await supabase
        .from('todos')
        .delete()
        .eq('task_id', id)
      if (errorTodos) {
        alert("Não foi possivel apagar a informação. Motivo: ", errorTodos.message)
        return;
      }
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
      if (error) {
        alert("Não foi possivel apagar a informação. Motivo: ", error.message)
      }
      else history.push('/tasks');
    } catch (error) {
      alert("Não foi possivel apagar a informação. Motivo: ", error.message)
      return;
    }
  }

  async function handleConclusion() {
    try {
      const { data: taskNew, error } = await supabase
        .from("tasks")
        .update({
          conclusion: !task.conclusion,
        })
        .eq('id', task.id)
        .single()
      if (error) {
        alert("Não foi possivel salvar a informação. Motivo: ", error.message)
        return;
      } else {
        setTask(taskNew)
      }
    } catch (error) {
      alert("Não foi possivel salvar a informação. Motivo: ", error.message)
      return;
    }
  }

  if (loading) return (<Loading />)

  if (errors.length > 0) return (<Error errors={errors} />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal}>
        <TaskEdit task={task} edit={task => setTask(task)} />
      </Modal>
      <CCol xs="12" sm="9" md="9">
        <Principal name={task.name} description={task.description} collapsed={collapsed}>
          <ConclusionSwitch conclusion={task.conclusion} action={handleConclusion} />
        </Principal>
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