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

export default function TaskStatusFooter(props) {

    const links = 1
    const todos = 1
    const comments = 2

    return (
        <CCardFooter className='text-center'>
            <CRow>
                <CCol>
                    <div className="text-value-md">{todos}</div>
                    <CIcon content={cilTask}/>
                </CCol>
                <CCol>
                    <div className="text-value-md">{links}</div>
                    <CIcon content={cilCursor}/>
                    {/* </div> */}

                </CCol>
                <CCol>
                    <div className="text-value-md">{comments}</div>
                    <CIcon content={cilSpeech}/>
                </CCol>
            </CRow>
        </CCardFooter>
    )
}