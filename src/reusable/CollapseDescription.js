import React from 'react'

import {
    CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const CollapseDescription = ({ action, status }) => {

    return (
        <CLink className="card-header-action" onClick={action}>
            <CIcon name={status ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
        </CLink>
    )
}

export default React.memo(CollapseDescription)