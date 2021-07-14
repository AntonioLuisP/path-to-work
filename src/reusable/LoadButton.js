import React from 'react'

import {
    CButton
} from '@coreui/react'

const LoadButton = ({ load }) => {

    return (
        <CButton type="submit" color="success" disabled={!load}>
            {
                load ? 'Adicionar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
            }
        </CButton>
    )
}

export default React.memo(LoadButton)