import React from 'react'

import {
    CAlert,
} from '@coreui/react'

import {
    cilSad,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Error = ({ errors }) => {

    return (
        <>
            {errors.map(error => (
                <CAlert key={error} color="danger">
                    <CIcon content={cilSad} width={20} /> Erro: {error}
                </CAlert>
            ))}
        </>

    )
}

export default React.memo(Error)