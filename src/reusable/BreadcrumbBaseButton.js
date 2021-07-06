import React, { useState } from 'react'
import { Modal } from '.'

import {
    CLink
} from '@coreui/react'

const BreadcrumbBaseButton = ({ component, children }) => {

    const [modal, setModal] = useState(false)

    const toogleModal = () => {
        setModal(old => !old)
    }

    return (
        <>
            <CLink
                rel="noreferrer noopener"
                className="card-header-action"
                onClick={toogleModal}
            >
                {children}
            </CLink>
            <Modal show={modal} onClose={toogleModal}>
                {component}
            </Modal>
        </>
    )
}

export default React.memo(BreadcrumbBaseButton)