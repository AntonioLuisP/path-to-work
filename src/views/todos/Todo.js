import React, { useState, useEffect } from 'react'
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionTodo } from '../../redux/todo'
import { Actions as ActionModal } from '../../redux/modal'
import { DropdownMore, Loading } from '../../reusable'
import TodoEdit from './TodoEdit'
import api from "../../services/api"

import {
  CCard,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'

export default function Comment() {

  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(true)

  const todo = useSelector(state => state.todo)

  const toogleModal = () => {
    dispatch(ActionModal.modalSwitch(<TodoEdit todo={todo} />))
  }

  useEffect(() => {
    api.get('comment/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(ActionTodo.selectOne(response.data.todo))
        }
        setLoading(false)
      })
    return () => {
      dispatch(ActionTodo.removeSelected())
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
      <CRow>
        <CCol xs="12" sm="12" md="12">
          <CCard>
            <CCardHeader color="secondary">
              {todo.name}
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
