import React from 'react'

import {
    CAlert,
} from '@coreui/react'

import {
    cilBellExclamation,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Avisos = ({ tipo, text }) => {

    return (
        <CAlert color={tipo} >
            <CIcon content={cilBellExclamation} /> {text}
        </CAlert>
    )
}

export default React.memo(Avisos)