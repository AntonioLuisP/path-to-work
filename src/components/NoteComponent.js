import React, { useState } from 'react'
import NoteEdit from '../views/notes/NoteEdit'
import { Modal, EditButton } from '../reusable'

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

    return (
        <CCard>
            <Modal show={modal} onClose={toogleModal}>
                <NoteEdit note={note} edit={note => setNote(note)} />
            </Modal>
            <CCardHeader className='text-break text-justify'>
                {note.name}
                <div className="card-header-actions">
                    <EditButton action={() => toogleModal()} />
                </div>
            </CCardHeader>
        </CCard>
    )
}


