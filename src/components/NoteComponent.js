import React, { useState } from 'react'
import { supabase } from '../services/supabase'
import NoteEdit from '../views/notes/NoteEdit'
import { Modal, EditButton, DeleteDataButton } from '../reusable'

import {
    CCardHeader,
    CCard,
} from '@coreui/react'

export default function NoteComponent(props) {

    const [note, setNote] = useState(props.note)
    const [modal, setModal] = useState(false)

    const toogleModal = () => {
        setModal(old => !old)
    }

    async function handleDelete() {
        try {
            const { errorNotes } = await supabase
                .from('notes')
                .delete()
                .eq('id', note.id)
            if (errorNotes) {
                alert("Não foi possivel apagar a informação. Motivo: ", errorNotes.message)
                return;
            }
            props.remove(note)
        } catch (error) {
            alert("Não foi possivel apagar a informação. Motivo: ", error.message)
            return;
        }
    }
    return (
        <CCard>
            <Modal show={modal} onClose={toogleModal}>
                <NoteEdit note={note} edit={note => setNote(note)} />
            </Modal>
            <CCardHeader className='text-break text-justify'>
                {note.name}
                <div className="card-header-actions">
                    <EditButton action={() => toogleModal()} />
                    <DeleteDataButton action={() => handleDelete()} />
                </div>
            </CCardHeader>
        </CCard>
    )
}


