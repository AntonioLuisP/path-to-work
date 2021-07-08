import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import LinkEdit from './LinkEdit'
import NoteCreate from '../notes/NoteCreate'
import ListCreate from '../lists/ListCreate'
import LinkCreateLists from '../linkList/LinkCreateLists'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
  BreadcrumbHeader,
  Loading,
  Modal,
  NoItems,
  PrincipalButtons,
  CollapseDescription,
  AddButton,
  RelateButton
} from '../../reusable'

import {
  ListComponent,
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

  const dispatch = useDispatch()
  const history = useHistory()

  const { id } = useParams();
  const { user } = useAuth()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

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
      const { data: notes, errorNotes } = await supabase
        .from("notes")
        .select("*")
        .eq('link_id', id)
        .order("created_at", { ascending: false });
      if (errorNotes) {
        console.log("errorNotes", errorNotes);
      }
      else {
        setNotes(notes)
      }
      const { data: lists, errorLists } = await supabase
        .from("list_links")
        .select("list_id, lists(*)")
        .eq('link_id', id)
        .order("created_at", { ascending: false });
      if (errorLists) {
        console.log("errorLists", errorLists);
      }
      else {
        const parsedLists = Object.entries(lists).map(([key, value]) => {
          return value.lists
        })
        setLists(parsedLists)
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

  async function handleRelationLinkList(list) {
    const { error } = await supabase
      .from("list_links")
      .insert({
        link_id: id,
        list_id: list.id,
        user_id: user.id
      })
      .single();
    if (error) {
      alert("error", error)
      return;
    } else {
      setLists([list, ...lists])
      dispatch(ActionNotification.addOne({
        header: 'Link adicionada a Lista:',
        body: list.name,
        id: list.id,
      }))
    }
    return;
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
        <BreadcrumbHeader title="Listas" quantidade={lists.length} >
          <RelateButton component={<LinkCreateLists id={id} add={() => { }} />} />
          <AddButton component={<ListCreate add={list => handleRelationLinkList(list)} />} />
        </BreadcrumbHeader>
        {lists <= 0 ? <NoItems /> :
          lists.map(list => (<ListComponent key={list.id} list={list} />))
        }
      </CCol>
    </CRow>
  )
}
