import React from 'react'

import {
    CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const EditDataButton = ({ action }) => {

    return (
        <CLink className="card-header-action" onClick={action}>
            <CIcon name="cil-pencil" />
        </CLink>
    )
}

export default React.memo(EditDataButton)