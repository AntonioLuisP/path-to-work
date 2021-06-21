import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionLink } from '../../redux/link'
import { BreadcrumbHeader, DropdownMore, Loading, Modal } from '../../reusable'
import { ListComponent, LinkInfo } from "../../components/"
import ListCreate from '../lists/ListCreate'
import LinkEdit from './LinkEdit'
import api from "../../services/api"

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Link() {

  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const link = useSelector(state => state.link)
  const lists = useSelector(state => state.lists)

  const toogleModal = () => {
    setModal(old => !old)
  }

  useEffect(() => {
    api.get('link/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(ActionLink.selectOne(response.data.link))
        }
        setLoading(false)
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

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<LinkEdit link={link} />} />
      <CCol xs="12" sm="9" md="9">
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
        <BreadcrumbHeader title="Listas" quantidade={lists.length} component={<ListCreate />} />
        {
          lists.map(list => (
            <ListComponent key={list.id} list={list} />
          ))
        }
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <LinkInfo link={link} />
      </CCol>
    </CRow>

  )
}
