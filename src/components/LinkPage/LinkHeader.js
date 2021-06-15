import React from 'react'
import LinkCreate from '../../views/links/LinkCreate'
import { useModal, Actions as ActionModal } from '../../context/ModalContext'

import {
    CBreadcrumb,
    CBreadcrumbItem,
    CButton,
} from '@coreui/react'

import {
    cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function LinkHeader() {

    const [, setModal] = useModal()

    const toogleModal = () => {
        setModal(ActionModal.modalSwitch(<LinkCreate />))
    }

    return (
        <CBreadcrumb className="border-0 c-subheader-nav">
            <CBreadcrumbItem active>Seus Links</CBreadcrumbItem>
            <CButton
                onClick={toogleModal}
            >
                <CIcon content={cilPlus} />
            </CButton>
        </CBreadcrumb>
    )
}