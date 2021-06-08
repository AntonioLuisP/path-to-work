import React from 'react'

import {
    CCard,
    CCardHeader,
    CCol,
} from '@coreui/react'

export default function CommentComponent(props) {

    const comment = props.comment
    
    return (
        <CCol xs="12" sm="12" md="12" key={comment.id}>
            <CCard>
                <CCardHeader>
                    {comment.comment}
                </CCardHeader>
            </CCard>
        </CCol>
    )
}


