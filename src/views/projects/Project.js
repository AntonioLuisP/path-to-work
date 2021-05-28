import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import TaskBoard from "../tasks/TaskBoard"
import api from "../../services/api"
import { DropdownMore } from '../../reusable/'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Project({ match }) {

  const history = useHistory()
  const [project, setProject] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    api.get('project/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setProject(response.data.project)
          setTasks(response.data.tasks)
        } else {
          setProject([])
        }
      })
  }, [match.params.id])

  async function handleDelete(id) {
    try {
      await api.delete(`/project/${id}`, {})
      history.push('/dashboard')
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
              {project.name}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => history.push('/projects/' + project.id + '/edit')}
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
      <TaskBoard project={project.id} lista={tasks} />
    </>
  )
}