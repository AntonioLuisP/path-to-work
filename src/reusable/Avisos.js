import React from 'react'

import {
    CAlert,
} from '@coreui/react'

import {
    cilMoodVeryGood,
    cilBellExclamation,
    cilWarning,
    cilZoom
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Avisos = ({ tipo, text }) => {

    const types = [
        {
            'color': 'success',
            'icon': (<CIcon content={cilMoodVeryGood} />)
        },
        {
            'color': 'warning',
            'icon': (<CIcon content={cilBellExclamation} />)

        },
        {
            'color': 'danger',
            'icon': (<CIcon content={cilWarning} />)

        },
        {
            'color': 'info',
            'icon': (<CIcon content={cilZoom} />)

        }
    ]
    const typeAviso = types.find(type => type.color === tipo)

    return (
        <CAlert color={typeAviso.color} >
            {typeAviso.icon} {text}
        </CAlert>
    )
}

export default React.memo(Avisos)