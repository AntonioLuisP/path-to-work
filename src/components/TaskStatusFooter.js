import React from 'react'

import {
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import {
    cilCursor,
    cilTask,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskStatusFooter({ links, todos }) {

    return (
        <CCardHeader className='text-center'>
            <CRow>
                <CCol>
                    <div className="text-value-md">{todos}</div>
                    <CIcon content={cilTask} />
                </CCol>
                <CCol>
                    <div className="text-value-md">{links}</div>
                    <CIcon content={cilCursor} />
                </CCol>
            </CRow>
        </CCardHeader>
    )
}