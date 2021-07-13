import React from 'react'
import { DataInfo } from '.'
import { formatDate, formatTime } from '../services/FormatDate'

import {
    CListGroupItem,
} from '@coreui/react'

export default function TaskInfo({ task, buttons }) {

    return (
        <DataInfo data={task} buttons={buttons} >
            <CListGroupItem>
                Data limite: {task.day_of === null ? 'Sem data' : formatDate(task.day_of)}
            </CListGroupItem>
            <CListGroupItem>
                Hora limite: {task.day_of === null ? 'Sem data' : formatTime(task.day_of)}
            </CListGroupItem>
        </DataInfo>

    )
}