import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionNote } from '../../redux/note'
import { DropdownMore, Loading, Modal } from '../../reusable'
import NoteEdit from './NoteEdit'
import { supabase } from '../../services/supabase'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Note() {

  const { id } = useParams();
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const note = useSelector(state => state.note)

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchNote = useCallback(async () => {
    const { data: note, error } = await supabase
      .from("notes")
      .select("*")
      .eq('id', id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      dispatch(ActionNote.selectOne(note))
    }
    setLoading(false)
  }, [id, dispatch])

  useEffect(() => {
    fetchNote()
    return () => {
      dispatch(ActionNote.removeSelected())
    }
  }, [fetchNote, dispatch])

  async function handleDelete() {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
    if (error) console.log("error", error);
    else history.push('/notes');
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<NoteEdit note={note} />} />
      <CCol xs="12" sm="9" md="9">
        <CCard className='text-break text-justify'>
          <CCardHeader color="secondary">
            {note.name}
            <div className="card-header-actions">
              <DropdownMore
                editAction={() => toogleModal()}
                deleteAction={() => handleDelete(note.id)}
              />
            </div>
          </CCardHeader>
        </CCard>
      </CCol>
    </CRow>
  )
}
