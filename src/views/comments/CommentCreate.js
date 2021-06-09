import React, { useState } from 'react'
import api from "../../services/api"
import { useDispatch } from 'react-redux'
import { addComment } from '../../actions/comments'
import { addNotification } from '../../actions/notifications'

import {
  CButton,
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
} from '@coreui/react'

export default function CommentCreate(props) {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)

  const task = props.task

  const [comment, setComment] = useState({
    'comment': '',
    'id_task': '',
  })

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'comment': comment.comment,
      'id_task': task.id,
    }
    try {
      await api.post('comment', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(addComment(response.data))
            dispatch(addNotification({
              header: 'Comentário adicionado:',
              body: response.data.comment,
              id: response.data.id,
            }))
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    } finally {
      setLoad(true)
    }
  }

  return (
    <>
      <CModalHeader closeButton>
        <CModalTitle>Novo Comentário</CModalTitle>
      </CModalHeader >
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CModalBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Diga algo"
                value={comment.comment}
                onChange={e => setComment(comment => ({ ...comment, 'comment': e.target.value }))}
              />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" color="success" disabled={!load}>
            {
              load ? 'Adicionar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
            }
          </CButton>
        </CModalFooter>
      </CForm>
    </>
  )
}