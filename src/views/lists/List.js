import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import LinkCreate from '../links/LinkCreate'
import ListEdit from './ListEdit'
import { LinkComponent, ListInfo } from "../../components/"
import ListCreateLinks from '../linkList/ListCreateLinks'

import {
  BreadcrumbHeader,
  Loading,
  Modal,
  NoItems,
  PrincipalButtons,
  AddButton,
  RelateButton
} from '../../reusable'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function List() {

  const { id } = useParams();
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const [list, setList] = useState({})
  const [links, setLinks] = useState([])

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchList = useCallback(async () => {
    const { data: list, error } = await supabase
      .from("lists")
      .select("*")
      .eq('id', id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      setList(list)
      setLinks([])
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  async function handleDelete() {
    if (window.confirm('Tem certeza que você deseja excluir?')) {
      const { error } = await supabase
        .from('lists')
        .delete()
        .eq('id', id)
      if (error) console.log("error", error);
      else history.push('/lists');
    }
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal}>
        <ListEdit list={list} edit={list => setList(list)} />
      </Modal>
      <CCol xs="12" sm="9" md="9">
        <CCard>
          <CCardHeader color="secondary" className='text-break text-justify'>
            {list.name}
          </CCardHeader>
        </CCard>
        <BreadcrumbHeader title='Links' quantidade={links.length}  >
          <RelateButton component={<ListCreateLinks add={() => { }} />} />
          <AddButton component={<LinkCreate add={() => { }} />} />
        </BreadcrumbHeader>
        {links <= 0 ? <NoItems /> :
          links.map(link => (<LinkComponent key={link.id} link={link} />))
        }
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <ListInfo list={list}>
          <div className="card-header-actions">
            <PrincipalButtons editAction={() => toogleModal()} deleteAction={() => handleDelete(list.id)} />
          </div>
        </ListInfo>
      </CCol>
    </CRow>
  )
}