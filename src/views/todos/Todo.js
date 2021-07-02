import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionTodo } from '../../redux/todo'
import { DropdownMore, Loading, Modal } from '../../reusable'
import TodoEdit from './TodoEdit'
import { supabase } from '../../services/supabase'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Todo() {

  const { id } = useParams();
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const todo = useSelector(state => state.todo)

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchTodo = useCallback(async () => {
    const { data: todo, error } = await supabase
      .from("todos")
      .select("*")
      .eq('id', id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      dispatch(ActionTodo.selectOne(todo))
    }
    setLoading(false)
  }, [id, dispatch])

  useEffect(() => {
    fetchTodo()
    return () => {
      dispatch(ActionTodo.removeSelected())
    }
  }, [fetchTodo, dispatch])

  async function handleDelete() {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
    if (error) console.log("error", error);
    else history.push('/todos');
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<TodoEdit todo={todo} />} />
      <CCol xs="12" sm="9" md="9">
        <CCard className='text-break text-justify'>
          <CCardHeader color="secondary">
            {todo.name}
            <div className="card-header-actions">
              <DropdownMore
                editAction={() => toogleModal()}
                deleteAction={() => handleDelete(todo.id)}
              />
            </div>
          </CCardHeader>
        </CCard>
      </CCol>
    </CRow>
  )
}
