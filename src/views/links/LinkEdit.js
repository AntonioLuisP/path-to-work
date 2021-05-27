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
} from '@coreui/react'

export default function LinkEdit({ match }) {
  const history = useHistory()

  const [id, setId] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    api.get('link/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setId(response.data.link.id)
          setUrl(response.data.link.url)
        }
      })
  }, [match.params.id])

  async function handleEdit(e) {
    e.preventDefault();
    const data = {
      url,
    }
    try {
      await api.put('/link/' + id, data, {})
        .then(response => {
          if (response.status === 200) {
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
            <CCardTitle>Editar Link</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <CLabel htmlFor="text-input">Link</CLabel>
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