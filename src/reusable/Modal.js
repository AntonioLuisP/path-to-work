import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../actions/modalAction'

import {
    CModal,
} from '@coreui/react'

const Modal = (props) => {

    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal)

    return (
        <CModal
            show={modal}
            onClose={() => { dispatch(modalAction(false)) }}
        >
            {props.component}
        </CModal>
    )
}

export default React.memo(Modal)