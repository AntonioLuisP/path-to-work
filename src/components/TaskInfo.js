import React from 'react'

import {
    CListGroup,
    CCard,
    CListGroupItem,
} from '@coreui/react'

export default function TaskInfo(props) {

    const task = props.task

    return (
        <CCard>
            <CListGroup flush>
                <CListGroupItem>
                    Informações
                </CListGroupItem>
                <CListGroupItem>
                    Data limite: {task.limite_date}
                </CListGroupItem>
                <CListGroupItem>
                    Hora limite: {task.horario}
                </CListGroupItem>
                <CListGroupItem>
                    Criado em: {task.created_at}
                </CListGroupItem>
                <CListGroupItem>
                    Editado em: {task.updated_at}
                </CListGroupItem>
            </CListGroup>
        </CCard>
    )
}