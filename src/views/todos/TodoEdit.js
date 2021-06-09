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
} from '@coreui/react'

export default function TodoEdit({ match }) {
  const history = useHistory()

  const [id, setId] = useState('')
  const [comment, setComment] = useState('')
  const [id_task, setId_task] = useState('')

  useEffect(() => {
    api.get('comment/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setId(response.data.id)
          setComment(response.data.comment.comment)
          setId_task(response.data.comment.id_task)
        }
      })
  }, [match.params.id])

  async function handleEdit(e) {
    e.preventDefault();
    const data = {
      comment,
    }
    try {
      await api.put('/comment/' + id, data, {})
        .then(response => {
          if (response.status === 200) {
            history.push("/questions/" + id_task)
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
            <CCardTitle>Editar Comentário</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="text-input">Comentário</CLabel>
                  <CInputGroup>
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Comentário"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <CInputGroupAppend>
                      <CButton type="submit" color="success">Salvar</CButton>
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