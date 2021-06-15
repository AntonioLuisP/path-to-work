import React from 'react'
import TaskCreate from '../../views/tasks/TaskCreate'
import { useModal, Actions as ActionModal } from '../../context/ModalContext'

import {
    CButton,
    CBreadcrumb,
    CBreadcrumbItem,
} from '@coreui/react'

import {
    cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskBoard(props) {

    const [, setModal] = useModal()

    const project = props.project

    const toogleModal = () => {
        setModal(ActionModal.modalSwitch(<TaskCreate project={project} />))
    }

    return (
        <CBreadcrumb className="border-0 c-subheader-nav">
            <CBreadcrumbItem active>Tarefas</CBreadcrumbItem>
            <CButton
                onClick={toogleModal}
            >
                <CIcon content={cilPlus} />
            </CButton>
        </CBreadcrumb>
    )
}