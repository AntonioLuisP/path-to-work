import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionModal } from '../redux/modal'

import {
    CModal,
} from '@coreui/react'

const Modal = () => {

    const dispatch = useDispatch()

    const modal = useSelector(state => state.modal)

    useEffect(() => {
        return () => {
            dispatch(ActionModal.modalSwitch(false, <></>))
        }
    }, [dispatch])

    return (
        <CModal
            show={modal.show}
            onClose={() => { dispatch(ActionModal.modalSwitch(false, <></>)) }}
            size='lg'
        >
            {modal.component}
        </CModal>
    )
}

export default React.memo(Modal)