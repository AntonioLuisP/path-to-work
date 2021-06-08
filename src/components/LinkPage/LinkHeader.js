import React from 'react'
import { useDispatch } from 'react-redux'
import LinkCreate from '../../views/links/LinkCreate'
import { modalAction } from '../../actions/modalAction'

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
        dispatch(modalAction(<LinkCreate />))
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