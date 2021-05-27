import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from "../../services/api"
import { DropdownMore } from '../../reusable'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Link({ match }) {

  const history = useHistory()
  const [link, setLink] = useState([])

  useEffect(() => {
    api.get('link/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setLink(response.data.link)
        } else {
          setLink([])
        }
      })
  }, [match.params.id])

  async function handleDelete(id) {
    try {
      await api.delete(`/link/${id}`, {})
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
              {link.url}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => history.push('/links/' + link.id + '/edit')}
                  deleteAction={() => handleDelete(link.id)}
                />
              </div>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}


