import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNotification } from '../../actions/notifications'
import api from "../../services/api"

import {
  CButton,
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
} from '@coreui/react'

export default function TaskCreate(props) {

  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects)

  const [load, setLoad] = useState(true)
  const [task, setTask] = useState({
    'name': '',
    'id_project': '',
  })

  useEffect(() => {
    if (typeof props.project !== "undefined") {
      setTask(task => ({ ...task, 'id_project': props.project.id }))
    } else if (Object.keys(projects).length > 0) {
      setTask(task => ({ ...task, 'id_project': projects[0].id }))
    }
  }, [props.project, projects])

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'name': task.name,
      'id_project': Number(task.id_project)
    }
    try {
      await api.post('task', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(addNotification({
              header: 'Tarefa adicionada:',
              body: response.data.name,
              id: response.data.id,
            }))
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    } finally {
      setLoad(true)
    }
  }

  return (
    <>
      <CModalHeader>
        <CModalTitle>Nova Tarefa</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CModalBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={task.name}
                onChange={e => setTask({ ...task, 'name': e.target.value })}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CLabel htmlFor="text-input">Projeto</CLabel>
              <CSelect
                value={task.id_project}
                onChange={e => setTask({ ...task, 'id_project': e.target.value })}
                custom
                name="select"
                id="select">
                {
                  projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))
                }
              </CSelect>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" color="success" disabled={!load}>
            {
              load ? 'Adicionar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
            }
          </CButton>
        </CModalFooter>
      </CForm>
    </>
  )
}