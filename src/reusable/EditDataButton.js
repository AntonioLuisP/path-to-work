import React from 'react'

import {
    CTooltip,
    CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const EditDataButton = ({ action }) => {

    return (
        <CLink className="card-header-action" onClick={action}>
            <CTooltip
                content='Editar'
                placement='top'
            >
                <CIcon name="cil-pencil" />
            </CTooltip>
        </CLink>
    )
}

export default React.memo(EditDataButton)