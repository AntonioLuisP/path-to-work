import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { DropdownMore } from '../../reusable'
import { useDispatch } from 'react-redux'
import { Actions as ActionModal } from '../../redux/modal'
import LinkEdit from './LinkEdit'
import api from "../../services/api"

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Link({ match }) {

  const dispatch = useDispatch()

  const history = useHistory()

  const [link, setLink] = useState({})

  const toogleModal = () => {
    dispatch(ActionModal.modalSwitch(<LinkEdit link={link} />))
  }

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
          <CCard className='text-break text-justify'>
            <CCardHeader color="secondary">
              {link.name}: {link.url}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => toogleModal()}
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


