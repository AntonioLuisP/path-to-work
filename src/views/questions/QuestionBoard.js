import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { SeeMore, ToasterNotification } from '../../reusable'
import api from "../../services/api"

import {
  CButton,
  CBreadcrumb,
  CBreadcrumbItem,
  CCard,
  CCardHeader,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CForm,
  CFormGroup,
  CRow,
} from '@coreui/react'

const QuestionBoard = ({ project, lista }) => {

  const history = useHistory()

  const [question, setQuestion] = useState('')
  const [id_project, setId_project] = useState('')
  const [notifications, setNotifications] = useState({})

  //lista
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setQuestions(lista)
    setId_project(project)
  }, [project, lista])

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      question,
      'id_project': id_project,
    }
    try {
      await api.post('question', data, {})
        .then(response => {
          if (response.status === 200) {
            setQuestions([...questions, response.data])
            setNotifications({
              header: 'Questão adicionada:',
              body: response.data.question,
              id: response.data.id,
            })
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    }
  }

  return (
    <CRow>
      <ToasterNotification notificaton={notifications} />
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Nova Questão</CBreadcrumbItem>
        </CBreadcrumb>
        <CForm onSubmit={handleCreate} className="form-horizontal">
          <CFormGroup row>
            <CCol xl="12" md="12" sm="12">
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
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Questões</CBreadcrumbItem>
        </CBreadcrumb>
        <CRow>
          {
            questions.map(question => (
              <CCol xs="12" sm="6" md="6" key={question.id}>
                <CCard>
                  <CCardHeader>
                    {question.question}
                    <div className="card-header-actions">
                      <SeeMore to={() => { history.push('/questions/' + question.id) }} />
                    </div>
                  </CCardHeader>
                </CCard>
              </CCol>
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}

export default QuestionBoard