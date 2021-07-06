import React, { useState } from 'react'
import { Modal } from '.'

import {
    CButton,
    CCard
} from '@coreui/react'

export default function CreateDataButton({ component }) {

    const [modal, setModal] = useState(false)

    const toogleModal = () => {
        setModal(old => !old)
    }

    return (
        <CCard className="content-center bg-transparent border-0">
            <Modal show={modal} onClose={toogleModal}>
                {component}
            </Modal>
            <CButton
                color="info"
                size='sm'
                onClick={toogleModal}
            >
                Adicionar
            </CButton>
        </CCard>
    )
}