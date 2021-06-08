import React from 'react'

import {
    CCard,
    CCardHeader,
    CListGroupItem,
} from '@coreui/react'

export default function TaskInfo(props){

    const task = props.task

    return (
        <CCard accentColor='info'>
            <CCardHeader>
                Informações
            </CCardHeader>
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
    )
}