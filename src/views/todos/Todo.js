import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from "../../services/api"
import { DropdownMore } from '../../reusable'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'

export default function Comment({ match }) {
  const history = useHistory()

  const [comment, setComment] = useState([])

  useEffect(() => {
    api.get('comment/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setComment(response.data.comment)
        } else {
          setComment([])
        }
      })
  }, [match.params.id])

  async function handleDelete(id) {
    try {
      await api.delete(`/comment/${id}`, {})
      alert('apaguei')
      history.push('/questions/' + comment.id_question)
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
              {comment.comment}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => history.push('/comments/' + comment.id + '/edit')}
                  deleteAction={() => handleDelete(comment.id)}
                />
              </div>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
