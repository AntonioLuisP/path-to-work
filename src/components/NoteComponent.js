import React, { useState } from 'react'
import NoteEdit from '../views/notes/NoteEdit'
import { Modal } from '../reusable'

import {
    CCardHeader,
    CCard,
    CButton
} from '@coreui/react'

import {
    cilPencil,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function NoteComponent(props) {

    const [note, setNote] = useState(props.note)
    const [modal, setModal] = useState(false)

    const toogleModal = () => {
        setModal(old => !old)
    }

    return (
        <CCard>
            <Modal show={modal} onClose={toogleModal} component={<NoteEdit note={note} edit={note => setNote(note)} />} />
            <CCardHeader className='text-break text-justify'>
                {note.name}
                <CButton
                    type='button'
                    onClick={() => toogleModal()} className='float-right'
                    size='sm'
                >
                    <CIcon width={18} content={cilPencil} />
                </CButton>
            </CCardHeader>
        </CCard>
    )
}


