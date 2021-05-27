import React from 'react'

import {
    CToast,
    CToastBody,
    CToastHeader,
} from '@coreui/react'

const Toasts = ({ header, body, id }) => {

    return (
        <CToast
            key={id}
            show={true}
            autohide={3000}
            fade={true}
        >
            <CToastHeader closeButton={true}>
                {header}
            </CToastHeader>
            <CToastBody>
                {body}
            </CToastBody>
        </CToast>
    )
}

export default Toasts