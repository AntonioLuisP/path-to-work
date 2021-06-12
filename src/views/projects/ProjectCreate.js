import React, { useState } from 'react'
import api from "../../services/api"
import { useDispatch } from 'react-redux'
import { Actions as ActionProject } from '../../redux/projects'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
  CButton,
  CCol,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
} from '@coreui/react'

export default function ProjectCreate() {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [project, setProject] = useState({
    'name': '',
    'description': '',
  })

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'name': project.name,
      'description': project.description
    }
    try {
      await api.post('project', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionProject.addOne(response.data))
            dispatch(ActionNotification.addOne({
              header: 'Projeto adicionado:',
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
      <CModalHeader closeButton>
        <CModalTitle>Novo Projeto</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CModalBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={project.name}
                onChange={e => setProject({ ...project, 'name': e.target.value })}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CTextarea
                name="textarea-input"
                id="textarea-input"
                rows="3"
                maxLength='500'
                placeholder="Descrição..."
                value={project.description}
                onChange={e => setProject({ ...project, 'description': e.target.value })}
              />
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