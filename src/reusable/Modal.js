import React from 'react'
import { useModal, Actions as ActionModal } from '../context/ModalContext'

import {
    CModal,
} from '@coreui/react'

const Modal = (props) => {

    const [modal, setModal] = useModal()
    console.log(modal)

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