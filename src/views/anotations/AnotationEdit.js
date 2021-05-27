import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import api from "../../services/api"

import {
  CButton,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CForm,
  CFormGroup,
  CInputGroup,
  CInputGroupAppend,
  CInput,
  CLabel,
  CRow,
  CSelect
} from '@coreui/react'

const AnotationEdit = ({ match }) => {
  const history = useHistory()

  const [id, setId] = useState('')
  const [anotation, setAnotation] = useState('')
  const [type, setType] = useState('Certeza')
  const [id_question, setId_question] = useState('')

  useEffect(() => {
    api.get('anotation/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setId(response.data.id)
          setAnotation(response.data.anotation)
          setType(response.data.type)
          setId_question(response.data.id_question)
        }
      })
  }, [match.params.id])

  async function handleEdit(e) {
    e.preventDefault();
    const data = {
      anotation,
      type,
    }
    try {
      await api.put('/anotation/' + id, data, {})
        .then(response => {
          if (response.status === 200) {
            history.push("/questions/" + id_question)
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
            <CCardTitle>Editar Anotação</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="text-input">Anotação</CLabel>
                  <CInputGroup>
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Anotação"
                      value={anotation}
                      onChange={e => setAnotation(e.target.value)}
                    />
                    <CInputGroupAppend>
                      <CSelect value={type} onChange={e => setType(e.target.value)} custom name="select" id="select">
                        <option value="Certeza">Certeza</option>
                        <option value="Dúvida">Dúvida</option>
                      </CSelect>
                      <CButton type="submit" color="success">Salvar</CButton>
                    </CInputGroupAppend>
                    <CInputGroupAppend>
                      <CButton
                        type="button"
                        onClick={() => history.goBack()}
                        color="secondary"
                      >
                        Cancelar
                      </CButton>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CCol>
              </CFormGroup>
            </CCardBody>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AnotationEdit



