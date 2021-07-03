import React from 'react'

import {
    CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const DeleteDataButton = ({ action }) => {

    return (
        <CLink className="card-header-action" onClick={action}>
            <CIcon name="cil-trash" className='text-danger' />
        </CLink>
    )
}

export default React.memo(DeleteDataButton)