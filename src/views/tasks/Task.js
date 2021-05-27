import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AnotationBoard from "../comments/CommentBoard"
import api from "../../services/api"
import { DropdownMore } from '../../reusable'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Task({ match }) {

  const history = useHistory()
  const [question, setName] = useState([])
  const [anotations, setAnotations] = useState([])

  useEffect(() => {
    api.get('question/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setName(response.data.question)
          setAnotations(response.data.anotations)
        } else {
          setName([])
        }
      })
  }, [match.params.id])

  async function handleDelete(id) {
    try {
      await api.delete(`/question/${id}`, {})
      alert('apaguei')
      history.push('/projects/' + question.id_project)
    } catch (error) {
      alert("Erro ao deletar o caso, tente novamente")
      console.log(error)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" md="12">
          <CCard>
            <CCardHeader color="secondary">
              {question.question}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => history.push('/questions/' + question.id + '/edit')}
                  deleteAction={() => handleDelete(question.id)}
                />
              </div>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
      <AnotationBoard question={question.id} lista={anotations} />
    </>
  )
}