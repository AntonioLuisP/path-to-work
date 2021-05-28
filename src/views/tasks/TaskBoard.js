import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { SeeMore, ToasterNotification } from '../../reusable'
import api from "../../services/api"

import {
  CButton,
  CBreadcrumb,
  CBreadcrumbItem,
  CCard,
  CCardHeader,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CForm,
  CFormGroup,
  CRow,
} from '@coreui/react'

export default function TaskBoard ({ project, lista }) {

  const history = useHistory()

  const [name, setName] = useState('')
  const [id_project, setId_project] = useState('')
  const [notifications, setNotifications] = useState({})

  //lista
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(lista)
    setId_project(project)
  }, [project, lista])

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      name,
      'id_project': id_project,
    }
    try {
      await api.post('task', data, {})
        .then(response => {
          if (response.status === 200) {
            setTasks([...tasks, response.data])
            setNotifications({
              header: 'Tarefa adicionada:',
              body: response.data.task,
              id: response.data.id,
            })
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    }
  }

  return (
    <CRow>
      <ToasterNotification notificaton={notifications} />
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Nova Tarefa</CBreadcrumbItem>
        </CBreadcrumb>
        <CForm onSubmit={handleCreate} className="form-horizontal">
          <CFormGroup row>
            <CCol xl="12" md="12" sm="12">
              <CInputGroup>
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Tarefa"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <CInputGroupAppend>
                  <CButton type="submit" color="success">Salvar</CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Tarefas</CBreadcrumbItem>
        </CBreadcrumb>
        <CRow>
          {
            tasks.map(task => (
              <CCol xs="12" sm="6" md="6" key={task.id}>
                <CCard>
                  <CCardHeader>
                    {task.name}
                    <div className="card-header-actions">
                      <SeeMore to={() => { history.push('/tasks/' + task.id) }} />
                    </div>
                  </CCardHeader>
                </CCard>
              </CCol>
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}