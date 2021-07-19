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
        <CBadge color='danger' className='content-center'>
            <CIcon content={cilWifiSignalOff} width={15} />Sem Sinal
        </CBadge>
    )
}
export default React.memo(NosignalBadge)