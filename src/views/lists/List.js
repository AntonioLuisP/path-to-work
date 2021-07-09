import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import ListEdit from './ListEdit'
import { ListInfo } from "../../components/"
import ListLinksIndex from '../linkList/ListLinksIndex';

import {
  Loading,
  Modal,
  PrincipalButtons,
} from '../../reusable'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function List() {

  const history = useHistory()

  const { id } = useParams();

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const [list, setList] = useState({})

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
        <ListLinksIndex listId={list.id} />

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