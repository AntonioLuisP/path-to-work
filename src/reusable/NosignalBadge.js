import React from 'react'

import {
    CBadge,
} from '@coreui/react'

import {
    cilWifiSignalOff,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const NosignalBadge = () => {

    return (
        <CBadge color='danger' >
            <CIcon content={cilWifiSignalOff} /> Sem Sinal
        </CBadge>
    )
}
export default React.memo(NosignalBadge)