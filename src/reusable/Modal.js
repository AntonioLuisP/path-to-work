import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../actions/modalAction'

import {
    CModal,
} from '@coreui/react'

const Modal = (props) => {

    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const toogleModal = () => {
        dispatch(modalAction(<></>))
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