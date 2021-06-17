import React from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionModal } from '../../redux/modal'
import TodoCreate from '../../views/todos/TodoCreate'

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

    const dispatch = useDispatch()

    const task = props.task

    const toogleModal = () => {
        dispatch(ActionModal.modalSwitch(<TodoCreate task={task} />))
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