import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionList } from '../../redux/list'
import { DropdownMore, Loading, Modal } from '../../reusable'
import ListEdit from './ListEdit'
import api from "../../services/api"


import {
  CCard,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'

export default function List({ match }) {

  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const list = useSelector(state => state.list)

  const toogleModal = () => {
    setModal(old => !old)
  }

  useEffect(() => {
    api.get('list/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(ActionList.selectOne(response.data.list))
        }
        setLoading(false)
      })
    return () => {
      dispatch(ActionList.removeSelected())
    }
  }, [id, dispatch])

  async function handleDelete(id) {
    try {
      await api.delete(`/list/${id}`, {})
      alert('apaguei')
      history.push('/lists/')
    } catch (error) {
      alert("Erro ao deletar o caso, tente novamente")
      console.log(error)
    }
  }

  if (loading) return (<Loading />)

  return (
    <>
      <Modal show={modal} onClose={toogleModal} component={<ListEdit list={list} />} />
      <CRow>
        <CCol xs="12" sm="12" md="12">
          <CCard>
            <CCardHeader color="secondary">
              {list.list}
              <div className="card-header-actions">
                <DropdownMore
                  editAction={() => toogleModal()}
                  deleteAction={() => handleDelete(list.id)}
                />
              </div>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}