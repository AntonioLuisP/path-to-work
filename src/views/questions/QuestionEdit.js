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

const QuestionEdit = ({ match }) => {
  const history = useHistory()

  const [id, setId] = useState('')
  const [question, setQuestion] = useState('')

  useEffect(() => {
    api.get('question/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setId(response.data.question.id)
          setQuestion(response.data.question.question)
        }
      })
  }, [match.params.id])

  async function handleEdit(e) {
    e.preventDefault();
    const data = {
      question,
    }
    try {
      await api.put('/question/' + id, data, {})
        .then(response => {
          if (response.status === 200) {
            history.push("/questions/" + id)
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
            <CCardTitle>Editar Questão</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="text-input">Questão</CLabel>
                  <CInputGroup>
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Questão"
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                    />
                    <CInputGroupAppend>
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

export default QuestionEdit



