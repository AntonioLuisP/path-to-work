import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import QuestionBoard from "../questions/QuestionBoard"
import api from "../../services/api"
import { DropdownMore } from '../../reusable/'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

const Project = ({ match }) => {

  const history = useHistory()
  const [project, setProject] = useState([])
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    api.get('project/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setProject(response.data.project)
          setQuestions(response.data.questions)
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
      <QuestionBoard project={project.id} lista={questions} />
    </>
  )
}

export default Project
