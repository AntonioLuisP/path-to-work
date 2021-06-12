import React from 'react'
import { useDispatch } from 'react-redux'
import TaskCreate from '../../views/tasks/TaskCreate'
import { Actions as ActionModal } from '../../redux/modal'

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

    const dispatch = useDispatch()

    const project = props.project

    const toogleModal = () => {
        dispatch(ActionModal.modalSwitch(<TaskCreate project={project} />))
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