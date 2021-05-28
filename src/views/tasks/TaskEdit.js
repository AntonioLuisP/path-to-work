import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
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
  CRow,
  CTextarea
} from '@coreui/react'

export default function TaskEdit({ match }) {

  const history = useHistory()

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    api.get('task/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setId(response.data.task.id)
          setName(response.data.task.name)
          setDescription(response.data.task.description)
        }
      })
  }, [match.params.id])

  async function handleEdit(e) {
    e.preventDefault();
    const data = {
      name,
      description
    }
    try {
      await api.put('/task/' + id, data, {})
        .then(response => {
          if (response.status === 200) {
            history.push("/tasks/" + id)
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs="12" sm="12">
        <CCard>
          <CCardHeader>
            <CCardTitle>Editar Tarefa</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <CLabel htmlFor="text-input">Nome</CLabel>
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
                  <CLabel htmlFor="textarea-input">Descrição</CLabel>
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
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                color="success"
              >
                Salvar
              </CButton>
              <CButton
                color="secondary"
                onClick={() => history.goBack()}
              >
                Cancelar
              </CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}