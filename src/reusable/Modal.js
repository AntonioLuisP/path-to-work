import React from 'react'
import { useSelector } from 'react-redux'

import {
    CModal,
} from '@coreui/react'

const Modal = (props) => {

    const modal = useSelector(state => state.modal)

    return (
        <CModal
            show={modal}
        >
            teste
        </CModal>
    )
}

export default React.memo(Modal)