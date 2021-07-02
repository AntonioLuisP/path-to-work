import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../reusable'

import {
    CCardHeader,
    CCard,
} from '@coreui/react'

import {
    cilNotes,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function NoteComponent({note}) {

    const history = useHistory()

    return (
        <CCard>
            <CCardHeader className='text-break text-justify'>
                    {note.name}
                <More to={() => history.push('/notes/' + note.id)}>
                    <CIcon width={18} content={cilNotes} />
                </More>
            </CCardHeader>
        </CCard>
    )
}


