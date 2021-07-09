import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import LinkEdit from './LinkEdit'
import NoteCreate from '../notes/NoteCreate'
import LinkListsIndex from '../linkList/LinkListsIndex';

import {
  BreadcrumbHeader,
  Loading,
  Modal,
  NoItems,
  PrincipalButtons,
  CollapseDescription,
  AddButton,
} from '../../reusable'

import {
  NoteComponent,
  LinkInfo
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
  const [notes, setNotes] = useState([])

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchLink = useCallback(async () => {
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
      const { data: notes, errorNotes } = await supabase
        .from("notes")
        .select("*")
        .eq('link_id', id)
        .order("created_at", { ascending: false });
      if (errorNotes) {
        console.log("errorNotes", errorNotes);
      } else {
        setNotes(notes)
      }
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchLink()
  }, [fetchLink])

  async function handleDelete() {
    if (window.confirm('Tem certeza que você deseja excluir?')) {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id)
      if (error) console.log("error", error);
      else history.push('/links');
    }
  }

  if (loading) return (<Loading />)

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
        <BreadcrumbHeader title="Anotações" quantidade={notes.length}>
          <AddButton
            component={<NoteCreate link={link} add={note => setNotes([note, ...notes])} />}
          />
        </BreadcrumbHeader>
        {notes <= 0 ? <NoItems /> :
          notes.map(note => (<NoteComponent key={note.id} note={note} />))
        }
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <LinkInfo link={link}>
          <div className="card-header-actions">
            <CollapseDescription status={collapsed} action={() => setCollapsed(!collapsed)} />
            <PrincipalButtons editAction={() => toogleModal()} deleteAction={() => handleDelete(link.id)} />
          </div>
        </LinkInfo>
        <LinkListsIndex linkId={link.id} />
      </CCol>
    </CRow>
  )
}