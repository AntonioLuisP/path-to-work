import React from 'react'

import {
    CModal,
} from '@coreui/react'

const Modal = ({ show, onClose, component }) => {

    return (
        <CModal
            show={show}
            onClose={onClose}
            size='lg'
        >
            {component}
        </CModal>
    )
}

export default React.memo(Modal)