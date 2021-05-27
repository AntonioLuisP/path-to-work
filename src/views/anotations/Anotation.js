import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from "../../services/api"
import { DropdownMore, TypeColorBadge } from '../../reusable/'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'

const Anotation = ({ match }) => {
  const history = useHistory()

  const [anotation, setAnotation] = useState([])

  useEffect(() => {
    api.get('anotation/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setAnotation(response.data)
        } else {
          setAnotation([])
        }
      })
  }, [match.params.id])


  async function handleDelete(id) {
    try {
      await api.delete(`/anotation/${id}`, {})
      alert('apaguei')
      history.push('/questions/' + anotation.id_question)
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
              <TypeColorBadge type={anotation.type} />
              {' '}{anotation.anotation}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => history.push('/anotations/' + anotation.id + '/edit')}
                  deleteAction={() => handleDelete(anotation.id)}
                />
              </div>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Anotation
