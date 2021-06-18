import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionComment } from '../../redux/comment'
import { DropdownMore, Loading, Modal } from '../../reusable'
import CommentEdit from './CommentEdit'
import api from "../../services/api"


import {
  CCard,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'

export default function Comment({ match }) {

  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const comment = useSelector(state => state.comment)

  const toogleModal = () => {
    setModal(old => !old)
  }

  useEffect(() => {
    api.get('comment/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(ActionComment.selectOne(response.data.comment))
        }
        setLoading(false)
      })
    return () => {
      dispatch(ActionComment.removeSelected())
    }
  }, [id, dispatch])

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

  if (loading) return (<Loading />)

  return (
    <>
      <Modal show={modal} onClose={toogleModal} component={<CommentEdit comment={comment} />} />
      <CRow>
        <CCol xs="12" sm="12" md="12">
          <CCard>
            <CCardHeader color="secondary">
              {comment.comment}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => toogleModal()}
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
