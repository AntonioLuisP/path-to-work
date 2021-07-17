import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import ListEdit from './ListEdit'
import ListLinksIndex from '../listLink/ListLinksIndex';

import {
  Loading,
  Modal,
  NoData,
  PrincipalButtons,
  Principal,
  DataInfo
} from '../../reusable'

import {
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
    setLoading(true)
    setList({})
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
      const { errorRelation } = await supabase
        .from('list_links')
        .delete()
        .eq('list_id', id)
      if (errorRelation) {
        console.log("errorRelation", errorRelation);
      } else {
        const { errorList } = await supabase
          .from('lists')
          .delete()
          .eq('id', id)
        if (errorList) console.log("errorList", errorList);
        else history.push('/lists');
      }
    }
  }

  if (loading) return (<Loading />)

  if (list.id === undefined) return (<NoData />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal}>
        <ListEdit list={list} edit={list => setList(list)} />
      </Modal>
      <CCol xs="12" sm="9" md="9">
        <Principal name={list.name} />
        <ListLinksIndex listId={list.id} />
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <DataInfo data={list} buttons={
          <div className="card-header-actions">
            <PrincipalButtons editAction={() => toogleModal()} deleteAction={() => handleDelete(list.id)} />
          </div>
        } />
      </CCol>
    </CRow>
  )
}