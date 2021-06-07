import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from "../../services/api"
import { DropdownMore } from '../../reusable'

import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'

export default function Task({ match }) {

  const history = useHistory()
  const [task, setTask] = useState({})

  useEffect(() => {
    api.get('task/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setTask(response.data.task)
        } else {
          setTask([])
        }
      })
  }, [match.params.id])

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

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" md="12">
          <CCard>
            <CCardHeader color="secondary">
              {task.name}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => history.push('/tasks/' + task.id + '/edit')}
                  deleteAction={() => handleDelete(task.id)}
                />
              </div>
            </CCardHeader>
            <CCardBody>
              {task.description} | {task.conclusion} | {task.limite_date}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}