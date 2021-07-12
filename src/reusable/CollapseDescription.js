import React from 'react'

import {
    CTooltip
} from '@coreui/react'

import {
    CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const CollapseDescription = ({ action, status }) => {

    return (
        <CLink className="card-header-action" onClick={action}>
            <CTooltip
                content={status ? 'Ver menos' : 'Ver mais'}
                placement='top'
            >
                <CIcon name={status ? 'cil-chevron-top' : 'cil-chevron-bottom'} />
            </CTooltip>
        </CLink>
    )
}

export default React.memo(CollapseDescription)