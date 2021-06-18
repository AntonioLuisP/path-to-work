import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Actions as ActionTask } from '../../redux/task'
import { Actions as ActionComment } from '../../redux/comment'
import { Actions as ActionTodo } from '../../redux/todo'
import { DropdownMore, Loading, Modal } from '../../reusable'
import LinkBoard from "../../components/LinkPage/LinkBoard"
import CommentBoard from '../../components/CommentPage/CommentBoard'
import TodoBoard from '../../components/TodoPage/TodoBoard'
import TaskInfo from '../../components/TaskPage/TaskInfo'
import TaskEdit from './TaskEdit'
import api from "../../services/api"

import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'

export default function Task() {

  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const task = useSelector(state => state.task)

  const comments = useSelector(state => state.comments)
  const links = useSelector(state => state.links)
  const todos = useSelector(state => state.todos)

  const toogleModal = () => {
    setModal(old => !old)
  }

  useEffect(() => {
    api.get('task/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(ActionTask.selectOne(response.data.task))
          dispatch(ActionComment.fillSome(response.data.comments))
          dispatch(ActionTodo.fillSome(response.data.todos))
        }
        setLoading(false)
      })
    return () => {
      dispatch(ActionTask.removeSelected())
    }
  }, [id, dispatch])

  async function handleDelete(id) {
    try {
      await api.delete(`/task/${id}`, {})
      alert('apaguei')
      history.push('/projects/' + task.id_project)
    } catch (error) {
      alert("Erro ao deletar o caso, tente novamente")
      console.log(error)
    }
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<TaskEdit task={task} />} />
      <CCol xs="12" sm="9" md="9">
        <CCard className='text-break text-justify'>
          <CCardHeader color="secondary">
            {task.name}
            <div className="card-header-actions">
              <DropdownMore
                editAction={() => toogleModal()}
                deleteAction={() => handleDelete(task.id)}
              />
            </div>
          </CCardHeader>
          <CCardBody>
            {task.description ? task.description : 'No description'}
          </CCardBody>
        </CCard>
        <CRow>
          <CCol xs="12" sm="6" md="6">
            <TodoBoard title='Afazeres' task={task} todos={todos} />
          </CCol>
          <CCol xs="12" sm="6" md="6">
            <LinkBoard title='Links' links={links} />
          </CCol>
        </CRow>
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <TaskInfo task={task} todos={todos} links={links} comments={comments} />
        <CommentBoard title='Comentários' task={task} comments={comments} />
      </CCol>
    </CRow>
  )
}