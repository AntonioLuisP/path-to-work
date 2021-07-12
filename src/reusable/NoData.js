import React from 'react'

import {
    CAlert,
} from '@coreui/react'

import {
    cilFaceDead,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const NoData = () => {

    return (
        <CAlert color="danger">
            <CIcon content={cilFaceDead} width={20}/> INFORMAÇÃO NÃO ENCONTRADA!
        </CAlert>
    )
}

export default React.memo(NoData)