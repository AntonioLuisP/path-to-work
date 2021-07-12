import React from 'react'
import { DataInfo } from '.'

import {
    CListGroupItem,
} from '@coreui/react'

export default function TaskInfo({ task, buttons }) {

    return (
        <DataInfo data={task} buttons={buttons} >
            <CListGroupItem>
                Data limite: {task.limite_date === null ? 'Sem data' : task.limite_date}
            </CListGroupItem>
            <CListGroupItem>
                Hora limite: {task.horario === null ? 'Sem data' : task.horario}
            </CListGroupItem>
        </DataInfo>

    )
}