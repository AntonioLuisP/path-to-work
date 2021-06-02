import React, { useState } from 'react'
import api from "../../services/api"
import { useDispatch } from 'react-redux'
import { addProject } from '../../actions/projects'
import { addNotification } from '../../actions/notifications'

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

const ProjectCreate = () => {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      name,
      description,
    }
    try {
      await api.post('project', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(addProject(response.data))
            dispatch(addNotification({
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
      <CModalHeader>
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
                value={name}
                onChange={e => setName(e.target.value)}
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
                value={description}
                onChange={e => setDescription(e.target.value)}
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

export default ProjectCreate



