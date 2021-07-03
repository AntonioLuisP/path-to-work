import React from 'react'

import {
    CListGroup,
    CCard,
    CCardHeader,
    CListGroupItem,
} from '@coreui/react'

export default function TaskInfo({ task, children }) {

    return (
        <CCard>
            <CCardHeader color="secondary">
                Informações {children}
            </CCardHeader>
            <CListGroup>
                <CListGroupItem>
                    Data limite: {task.limite_date === null ? 'Sem data' : task.limite_date}
                </CListGroupItem>
                <CListGroupItem>
                    Hora limite: {task.horario === null ? 'Sem Horario' : task.horario}
                </CListGroupItem>
                <CListGroupItem>
                    Criado em: {task.created_at}
                </CListGroupItem>
                <CListGroupItem>
                    Editado em: {task.updated_at === null ? 'Sem data' : task.updated_at}
                </CListGroupItem>
            </CListGroup>
        </CCard>
    )
}