import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionModal } from '../redux/modal'

import {
    CModal,
} from '@coreui/react'

const Modal = () => {

    const dispatch = useDispatch()

    const modal = useSelector(state => state.modal)

    const toogleModal = () => {
        dispatch(ActionModal.modalSwitch(<></>))
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