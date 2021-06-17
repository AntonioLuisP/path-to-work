import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionModal } from '../../redux/modal'
import { Actions as ActionLink } from '../../redux/link'
import { DropdownMore } from '../../reusable'
import LinkEdit from './LinkEdit'
import api from "../../services/api"

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Link() {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams();

  const link = useSelector(state => state.link)

  const toogleModal = () => {
    dispatch(ActionModal.modalSwitch(<LinkEdit link={link} />))
  }

  useEffect(() => {
    api.get('link/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(ActionLink.selectOne(response.data.link))
        }
      })
    return () => {
      dispatch(ActionLink.removeSelected())
    }
  }, [id, dispatch])

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


