import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import LinkEdit from './LinkEdit'
import NoteIndex from '../notes/NoteIndex'
import LinkListsIndex from '../listLink/LinkListsIndex';
import LinkTasksIndex from '../taskLink/LinkTasksIndex';

import {
  Loading,
  Modal,
  NoData,
  PrincipalButtons,
  CollapseDescription,
} from '../../reusable'

import {
  DataInfo
} from "../../components/"

import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CCollapse
} from '@coreui/react'

export default function Link() {

  const history = useHistory()

  const { id } = useParams();

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const [link, setLink] = useState({})

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchLink = useCallback(async () => {
    setLoading(true)
    setLink({})
    const { data: link, error } = await supabase
      .from("links")
      .select("*")
      .eq('id', id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      setLink(link)
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchLink()
  }, [fetchLink])

  async function handleDelete() {
    if (window.confirm('Tem certeza que você deseja excluir?')) {
      const { errorListLinks } = await supabase
        .from('list_links')
        .delete()
        .eq('link_id', id)
      if (errorListLinks) {
        console.log("errorListLinks", errorListLinks);
      }
      const { errorTaskLinks } = await supabase
        .from('task_links')
        .delete()
        .eq('link_id', id)
      if (errorTaskLinks) {
        console.log("errorTaskLinks", errorTaskLinks)
      }
      if (!errorListLinks && !errorTaskLinks) {
        const { errorNotes } = await supabase
          .from('notes')
          .delete()
          .eq('link_id', id)
        if (errorNotes) {
          console.log("errorNotes", errorNotes)
        } else {
          const { error } = await supabase
            .from('links')
            .delete()
            .eq('id', id)
          if (error) console.log("error", error);
          else history.push('/links');
        }
      }
    }
  }

  if (loading) return (<Loading />)

  if (link.id === undefined) return (<NoData />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal}>
        <LinkEdit link={link} edit={link => setLink(link)} />
      </Modal>
      <CCol xs="12" sm="9" md="9">
        <CCard className='text-break text-justify'>
          <CCardHeader color="secondary">
            {link.name}: {link.url}
          </CCardHeader>
          <CCollapse show={collapsed}>
            <CCardBody>
              {link.description === '' ? 'Sem Descrição' : link.description}
            </CCardBody>
          </CCollapse>
        </CCard>
        <CRow>
          <CCol xs="12" sm="8" md="8">
            <NoteIndex linkId={link.id} />
          </CCol>
          <CCol xs="12" sm="4" md="4">
            <LinkTasksIndex linkId={link.id} />
          </CCol>
        </CRow>
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <DataInfo data={link} buttons={
          <div className="card-header-actions">
            <CollapseDescription status={collapsed} action={() => setCollapsed(!collapsed)} />
            <PrincipalButtons editAction={() => toogleModal()} deleteAction={() => handleDelete(link.id)} />
          </div>
        } />
        <LinkListsIndex linkId={link.id} />
      </CCol>
    </CRow>
  )
}