import React, { useState } from 'react'
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
} from '@coreui/react'

export default function LinkCreate() {
  const history = useHistory();

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      name,
      url,
    }
    try {
      await api.post('link', data, {})
        .then(response => {
          if (response.status === 200) {
            setId(response.data.id)
            history.push("/links/" + id)
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
            <CCardTitle>Novo Link</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleCreate} className="form-horizontal">
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
                  <CLabel htmlFor="text-input">URL</CLabel>
                  <CInput
                    id="text-input"
                    name="text-input"
                    placeholder="Url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
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