import React from 'react'

import {
    CTooltip,
    CLink
} from '@coreui/react'

import {
    cilPencil,
} from '@coreui/icons'


import CIcon from '@coreui/icons-react'

const EditButton = ({ action }) => {

    return (
        <CLink className="card-header-action" onClick={action}>
            <CTooltip
                content='Editar'
                placement='top'
            >
                <CIcon content={cilPencil} width={20} />
            </CTooltip>
        </CLink>
    )
}

export default React.memo(EditButton)