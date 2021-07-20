import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import LinkEdit from './LinkEdit'
import NoteIndex from '../notes/NoteIndex'
import LinkListsIndex from '../listLink/LinkListsIndex';
import LinkTasksIndex from '../taskLink/LinkTasksIndex';

import {
  GoOutside,
  Loading,
  Error,
  Favorite,
  Modal,
  PrincipalButtons,
  CollapseDescription,
  Principal,
  DataInfo
} from '../../reusable'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function Link() {

  const history = useHistory()

  const { id } = useParams();

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [modal, setModal] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const [link, setLink] = useState({})

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchLink = useCallback(async () => {
    setLoading(true)
    setLink({})
    try {
      const { data: link, error } = await supabase
        .from("links")
        .select("*")
        .eq('id', id)
        .single()
      if (error) {
        setErrors(prev => [...prev, error.message])
      }
      else {
        setLink(link)
      }
    } catch (error) {
      setErrors(prev => [...prev, error.message])
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchLink()
  }, [fetchLink])

  async function handleDelete() {
    try {
      const { errorListLinks } = await supabase
        .from('list_links')
        .delete()
        .eq('link_id', id)
      if (errorListLinks) {
        alert("Não foi possivel apagar a informação. Motivo: ", errorListLinks.message)
        return;
      }
      const { errorTaskLinks } = await supabase
        .from('task_links')
        .delete()
        .eq('link_id', id)
      if (errorTaskLinks) {
        alert("Não foi possivel apagar a informação. Motivo: ", errorTaskLinks.message)
        return;
      }
      const { errorProfileLinks } = await supabase
        .from('profile_links')
        .delete()
        .eq('link_id', id)
      if (errorProfileLinks) {
        alert("Não foi possivel apagar a informação. Motivo: ", errorProfileLinks.message)
        return;
      }
      const { errorNotes } = await supabase
        .from('notes')
        .delete()
        .eq('link_id', id)
      if (errorNotes) {
        alert("Não foi possivel apagar a informação. Motivo: ", errorNotes.message)
        return;
      }
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id)
      if (error) {
        alert("Não foi possivel apagar a informação. Motivo: ", error.message)
      }
      else history.push('/links');
    } catch (error) {
      alert("Não foi possivel apagar a informação. Motivo: ", error.message)
      return;
    }
  }

  async function handleFavorite() {
    try {
      const { data: linkNew, error } = await supabase
        .from("links")
        .update({
          is_favorite: !link.is_favorite,
        })
        .eq('id', link.id)
        .single()
      if (error) {
        alert("Não foi possivel salvar a informação. Motivo: ", error.message)
        return;
      } else {
        setLink(linkNew)
      }
    } catch (error) {
      alert("Não foi possivel salvar a informação. Motivo: ", error.message)
      return;
    }
  }

  if (loading) return (<Loading />)

  if (errors.length > 0) return (<Error errors={errors} />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal}>
        <LinkEdit link={link} edit={link => setLink(link)} />
      </Modal>
      <CCol xs="12" sm="9" md="9">
        <Principal name={link.name} description={link.description} collapsed={collapsed} >
          <Favorite favorito={link.is_favorite} action={handleFavorite} />
          <GoOutside go={link.url} />
        </Principal>
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