import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import api from "../../services/api"
// import { Actions as ActionComment } from '../../redux/comments'
import { Actions as ActionNotification } from '../../redux/notifications'

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

export default function CommentEdit({ match }) {

  const dispatch = useDispatch()

  const history = useHistory()

  const [comment, setComment] = useState({
    'id': '',
    'comment': '',
    'id_task': '',
  })

  useEffect(() => {
    api.get('comment/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setComment(response.data.comment)
        }
      })
  }, [match.params.id])

  async function handleEdit(e) {
    e.preventDefault();
    const data = {
      comment,
    }
    try {
      await api.put('/comment/' + comment.id, data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionNotification.addOne({
              header: 'Comentário Editado:',
              body: '',
              id: response.data.id,
            }))
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
                      value={comment.comment}
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