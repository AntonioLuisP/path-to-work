import React from 'react'
import TodoCreate from '../../views/todos/TodoCreate'
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

export default function CommentHeader(props) {

    const [, setModal] = useModal()

    const task = props.task

    const toogleModal = () => {
        setModal(ActionModal.modalSwitch(<TodoCreate task={task} />))
    }

    return (
        <CBreadcrumb className="border-0 c-subheader-nav">
            <CBreadcrumbItem active>Afazeres</CBreadcrumbItem>
            <CButton
                onClick={toogleModal}
            >
                <CIcon content={cilPlus} />
            </CButton>
        </CBreadcrumb>

    )
}