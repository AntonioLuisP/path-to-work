import React from 'react'
import { useModal, Actions as ActionModal } from '../../context/ModalContext'
import CommentCreate from '../../views/comments/CommentCreate'

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
        setModal(ActionModal.modalSwitch(<CommentCreate task={task} />))
    }

    return (
        <CBreadcrumb className="border-0 c-subheader-nav">
            <CBreadcrumbItem active>Comentários</CBreadcrumbItem>
            <CButton
                onClick={toogleModal}
            >
                <CIcon content={cilPlus} />
            </CButton>
        </CBreadcrumb>

    )
}