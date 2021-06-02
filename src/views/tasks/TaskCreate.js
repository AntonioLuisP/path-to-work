import React, { useState } from 'react'
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

export default function TaskCreate() {

  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects)

  const [load, setLoad] = useState(true)
  const [name, setName] = useState('')
  const [id_project, setId_project] = useState('')

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      name,
      id_project
    }
    try {
      await api.post('task', data, {})
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
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
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CLabel htmlFor="text-input">Projeto</CLabel>
              <CSelect value={id_project} onChange={e => setId_project(e.target.value)} custom name="select" id="select">
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