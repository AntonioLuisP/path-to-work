import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from "../../services/api"
import { DropdownMore, ToasterNotification } from '../../reusable'

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
} from '@coreui/react'

export default function CommentBoard({ task, lista }) {

  const history = useHistory()

  const [comment, setComment] = useState('')
  const [id_task, setId_task] = useState('')
  const [notifications, setNotifications] = useState({})

  //lista
  const [comments, setComments] = useState([])

  useEffect(() => {
    setComments(lista)
    setId_task(task)
  }, [task, lista])

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      comment,
      'id_task': id_task,
    }
    try {
      await api.post('comment', data, {})
        .then(response => {
          if (response.status === 200) {
            setComments([...comments, response.data])
            setNotifications({
              header: 'Comentário adicionado: ' + response.data.type,
              body: response.data.comment,
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
      await api.delete('/comment/' + id, {})
      setComments(comments.filter(comment => comment.id !== id))
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
          <CBreadcrumbItem active>Novo Comentário</CBreadcrumbItem>
        </CBreadcrumb>
        <CForm onSubmit={handleCreate} className="form-horizontal">
          <CFormGroup row>
            <CCol xl="12" md="12" sm="12">
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
                </CInputGroupAppend>
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Comentários</CBreadcrumbItem>
        </CBreadcrumb>
        <CRow>
          {
            comments.map(comment => (
              <CCol xs="12" sm="6" md="6" key={comment.id}>
                <CCard>
                  <CCardHeader>
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
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}