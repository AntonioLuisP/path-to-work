import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from "../../services/api"

import {
  CButton,
  CCol,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
} from '@coreui/react'

export default function TaskCreate() {


  const history = useHistory()

  const [load, setLoad] = useState(true)
  const [name, setName] = useState('')
  const [id_project, setId_project] = useState('')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('project')
      .then(response => {
        if (response.status === 200) {
          setProjects(response.data.data)
          setId_project(response.data.data[0].id)
        }
      })
  }, [])

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
            history.push('/tasks/' + response.data.id)
          }
        })
    } catch (error) {
      setLoad(true)
      alert("erro")
      console.log(error)
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Nova Tarefa</CCardTitle>
      </CCardHeader>
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CCardBody>
          <CFormGroup row>
            <CCol xs="6" md="6">
              <CLabel htmlFor="text-input">Tarefa</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </CCol>
            <CCol xs="6" md="6">
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
        </CCardBody>
        <CCardFooter>
          <CButton
            type="submit"
            color="success"
            disabled={!load}
          >
            {
              load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
            }
          </CButton>
        </CCardFooter>
      </CForm>
    </CCard>
  )
}