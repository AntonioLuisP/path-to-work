import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { BreadcrumbHeader, DropdownMore, Loading, Modal, NoItems } from '../../reusable'
import { ListComponent, NoteComponent, LinkInfo } from "../../components/"
import ListCreate from '../lists/ListCreate'
import NoteCreate from '../notes/NoteCreate'
import LinkEdit from './LinkEdit'
import { supabase } from '../../services/supabase'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Link() {

  const { id } = useParams();
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const [link, setLink] = useState({})
  const [lists, setLists] = useState([])
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
      const { data: notes, error } = await supabase
        .from("notes")
        .select("*")
        .eq('link_id', id)
      if (error) {
        console.log("error", error);
      }
      else {
        setNotes(notes)
      }
      setLists([])
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchLink()
  }, [fetchLink])

  async function handleDelete() {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id)
    if (error) console.log("error", error);
    else history.push('/links');
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<LinkEdit link={link} edit={link => setLink(link)} />} />
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
        <BreadcrumbHeader title="Anotações" quantidade={notes.length} component={<NoteCreate link={link} add={note => setNotes([...notes, note])} />} />
        {notes <= 0 ? <NoItems /> :
          notes.map(note => (<NoteComponent key={note.id} note={note} />))
        }
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <LinkInfo link={link} />
        <BreadcrumbHeader title="Listas" quantidade={lists.length} component={<ListCreate />} />
        {lists <= 0 ? <NoItems /> :
          lists.map(list => (<ListComponent key={list.id} list={list} />))
        }
      </CCol>
    </CRow>
  )
}
