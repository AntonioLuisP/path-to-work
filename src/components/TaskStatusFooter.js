import React from 'react'

import {
    CCardFooter,
    CCol,
    CRow,
} from '@coreui/react'

import {
    cilCursor,
    cilTask,
    cilSpeech
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskStatusFooter({ links, todos, comments }) {

    return (
        <CCardFooter className='text-center'>
            <CRow>
                <CCol>
                    <div className="text-value-md">{todos}</div>
                    <CIcon content={cilTask} />
                </CCol>
                <CCol>
                    <div className="text-value-md">{links}</div>
                    <CIcon content={cilCursor} />
                </CCol>
                <CCol>
                    <div className="text-value-md">{comments}</div>
                    <CIcon content={cilSpeech} />
                </CCol>
            </CRow>
        </CCardFooter>
    )
}