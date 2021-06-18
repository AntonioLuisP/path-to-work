import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Actions as ActionProject } from '../../redux/project'
import { Actions as ActionModal } from '../../redux/modal'
import { Actions as ActionTask } from '../../redux/task'
import { DropdownMore, Loading } from '../../reusable/'
import TaskBoard from '../../components/TaskPage/TaskBoard'
import ProjectEdit from './ProjectEdit'
import api from "../../services/api"

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Project() {

  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(true)

  const project = useSelector(state => state.project)
  const tasks = useSelector(state => state.tasks)

  const toogleModal = () => {
    dispatch(ActionModal.modalSwitch(true, <ProjectEdit project={project} />))
  }

  useEffect(() => {
    api.get('project/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(ActionProject.selectOne(response.data.project))
          dispatch(ActionTask.fillSome(response.data.tasks))
        }
        setLoading(false)
      })
    return () => {
      dispatch(ActionProject.removeSelected())
    }
  }, [id, dispatch])

  async function handleDelete(id) {
    try {
      await api.delete(`/project/${id}`, {})
      history.push('/dashboard')
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
          <CCard className='text-break text-justify'>
            <CCardHeader color="secondary">
              {project.name}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => toogleModal()}
                  deleteAction={() => handleDelete(project.id)}
                />
              </div>
            </CCardHeader>
            <CCardBody>
              {project.description}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <TaskBoard title='Tarefas' project={project} tasks={tasks} />
    </>
  )
}