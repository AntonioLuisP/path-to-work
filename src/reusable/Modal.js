import React from 'react'
import { useModal, Actions as ActionModal } from '../context/ModalContext'

import {
    CModal,
} from '@coreui/react'

const Modal = () => {

    const [modal, setModal] = useModal()

    const toogleModal = () => {
        setModal(ActionModal.modalSwitch(<></>))
    }

    return (
        <CModal
            show={modal.show}
            onClose={toogleModal}
        >
            {modal.component}
        </CModal>
    )
}

export default React.memo(Modal)