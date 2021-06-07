import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import api from "../../services/api"
import { DropdownMore, Loading } from '../../reusable/'
import ProjectEdit from './ProjectEdit'
import { modalAction } from '../../actions/modalAction'
import TaskBoard from '../tasks/TaskBoard'

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

  const [project, setProject] = useState()

  const toogleModal = () => {
    dispatch(modalAction(<ProjectEdit project={project} />))
  }

  useEffect(() => {
    api.get('project/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setProject(response.data.project)
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

  if (project === undefined) return (<Loading />)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" md="12">
          <CCard>
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
      <TaskBoard project={project} />
    </>
  )
}