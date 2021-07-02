import React, { useState } from 'react'
import { Modal } from '.'

import {
    CButton,
} from '@coreui/react'

import {
    cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function CreateDataButton({ component }) {

    const [modal, setModal] = useState(false)

    const toogleModal = () => {
        setModal(old => !old)
    }

    return (
        <>
            <Modal show={modal} onClose={toogleModal} component={component} />
            <CButton
                color="dark"
                onClick={toogleModal}
            >
                <CIcon content={cilPlus} />
            </CButton>
        </>
    )
}