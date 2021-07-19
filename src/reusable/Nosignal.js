import React from 'react'

import {
    CAlert,
} from '@coreui/react'

import {
    cilWifiSignalOff,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Nosignal = (sinal) => {

    if (sinal) return (<></>)

    return (
        <CAlert color='danger' >
            <CIcon content={cilWifiSignalOff} width={22} /> Sem Sinal
        </CAlert>
    )    
}
export default React.memo(Nosignal)