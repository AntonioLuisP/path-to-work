import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from "../../services/api"
import { DropdownMore, ToasterNotification, TypeColorBadge } from '../../reusable/'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCard,
  CCardHeader,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CForm,
  CFormGroup,
  CRow,
  CSelect
} from '@coreui/react'

const AnotationBoard = ({ question, lista }) => {

  const history = useHistory()

  const [anotation, setAnotation] = useState('')
  const [type, setType] = useState('Certeza')
  const [id_question, setId_question] = useState('')
  const [notifications, setNotifications] = useState({})

  //lista
  const [anotations, setAnotations] = useState([])

  useEffect(() => {
    setAnotations(lista)
    setId_question(question)
  }, [question, lista])

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      anotation,
      type,
      'id_question': id_question,
    }
    try {
      await api.post('anotation', data, {})
        .then(response => {
          if (response.status === 200) {
            setAnotations([...anotations, response.data])
            setNotifications({
              header: 'Anotação adicionada: ' + response.data.type,
              body: response.data.anotation ,
              id: response.data.id,
            })
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete('/anotation/' + id, {})
      setAnotations(anotations.filter(anotation => anotation.id !== id))
    } catch (error) {
      alert("Erro ao deletar o caso, tente novamente")
      console.log(error)
    }
  }

  return (
    <CRow>
      <ToasterNotification notificaton={notifications} /> 
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Nova Anotação</CBreadcrumbItem>
        </CBreadcrumb>
        <CForm onSubmit={handleCreate} className="form-horizontal">
          <CFormGroup row>
            <CCol xl="12" md="12" sm="12">
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
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Anotações</CBreadcrumbItem>
        </CBreadcrumb>
        <CRow>
          {
            anotations.map(anotation => (
              <CCol xs="12" sm="6" md="6" key={anotation.id}>
                <CCard>
                  <CCardHeader>
                    <TypeColorBadge type={anotation.type} />
                    {' '}{anotation.anotation}
                    <div className="card-header-actions">
                      <DropdownMore
                        editAction={() => history.push('/anotations/' + anotation.id + '/edit')}
                        deleteAction={() => handleDelete(anotation.id)}
                      />
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

export default AnotationBoard