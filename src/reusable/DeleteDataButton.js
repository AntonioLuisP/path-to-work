import React from 'react'

import {
    CTooltip,
    CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const DeleteDataButton = ({ action }) => {

    return (
        <CLink className="card-header-action" onClick={action}>
            <CTooltip
                content='Deletar'
                placement='top'
            >
                <CIcon name="cil-trash" className='text-danger' />
            </CTooltip>
        </CLink >
    )
}

export default React.memo(DeleteDataButton)