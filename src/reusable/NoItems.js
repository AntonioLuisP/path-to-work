import React from 'react'

import {
    CAlert,

} from '@coreui/react'

import {
    cilBan,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const NoItems = () => {

    return (
        <CAlert color="danger">
            <CIcon content={cilBan} /> Nada cadastrado. Adicione algo!
        </CAlert>
    )
}

export default React.memo(NoItems)