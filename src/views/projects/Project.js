import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DropdownMore, Loading } from '../../reusable/'
import TaskBoard from '../../components/TaskPage/TaskBoard'
import ProjectEdit from './ProjectEdit'
import api from "../../services/api"
import { Actions as ActionModal } from '../../redux/modal'
import { Actions as ActionTask } from '../../redux/tasks'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Project({ match }) {

  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState(null)
  const tasks = useSelector(state => state.tasks)

  const toogleModal = () => {
    dispatch(ActionModal.modalSwitch(<ProjectEdit project={project} />))
  }

  useEffect(() => {
    api.get('project/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setProject(response.data.project)
          dispatch(ActionTask.fillSome(response.data.tasks))
        } else {
          setProject([])
        }
        setLoading(false)
      })
  }, [match.params.id, dispatch])

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
      <TaskBoard project={project} tasks={tasks} />
    </>
  )
}