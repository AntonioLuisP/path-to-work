import React, { useState } from 'react'

import {
    CButton,
    CBreadcrumb,
    CBreadcrumbItem,
    CCard,
    CCollapse,
    CListGroupItem,
} from '@coreui/react'

import {
    cilSwapVertical,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskInfo(props) {

    const task = props.task

    const [collapse, setCollapse] = useState(false)

    return (
        <>
            <CBreadcrumb className="border-0 c-subheader-nav">
                <CBreadcrumbItem active>Informações</CBreadcrumbItem>
                <CButton
                    onClick={() => setCollapse(!collapse)}
                >
                    <CIcon content={cilSwapVertical} />
                </CButton>
            </CBreadcrumb>
            <CCollapse show={collapse}>
                <CCard>
                    <CListGroupItem>
                        Pertence ao Projeto: {task.id_project}
                    </CListGroupItem>
                    <CListGroupItem>
                        Data limite: {task.limite_date}
                    </CListGroupItem>
                    <CListGroupItem>
                        Criado em: {task.created_at}
                    </CListGroupItem>
                    <CListGroupItem>
                        Editado em: {task.updated_at}
                    </CListGroupItem>
                </CCard>
            </CCollapse>
        </>
    )
}