import React from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionModal } from '../../redux/modal'
import LinkCreate from '../../views/links/LinkCreate'

import {
    CBreadcrumb,
    CBreadcrumbItem,
    CButton,
} from '@coreui/react'

import {
    cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function LinkHeader() {

    const dispatch = useDispatch()

    const toogleModal = () => {
        dispatch(ActionModal.modalSwitch(<LinkCreate />))
    }

    return (
        <CBreadcrumb className="border-0 c-subheader-nav">
            <CBreadcrumbItem active>Seus Links</CBreadcrumbItem>
            <CButton
                onClick={toogleModal}
            >
                <CIcon content={cilPlus} />
            </CButton>
        </CBreadcrumb>
    )
}