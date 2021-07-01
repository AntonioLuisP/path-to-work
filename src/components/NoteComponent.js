import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../reusable'

import {
    CCardBody,
    CCard,
    CCardText,
} from '@coreui/react'

import {
    cilNotes,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function NoteComponent(props) {

    const history = useHistory()

    const note = props.note

    return (
        <CCard>
            <CCardBody>
                <CCardText className='text-break text-justify'>
                    {note.name}
                </CCardText>
                <More to={() => history.push('/notes/' + note.id)}>
                    <CIcon width={18} content={cilNotes} />
                </More>
            </CCardBody>
        </CCard>
    )
}


