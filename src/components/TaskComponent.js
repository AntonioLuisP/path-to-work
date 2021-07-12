import React from 'react'
import { GoTo } from '../reusable'
import TaskStatusHeader from './TaskStatusHeader'

import {
    CCard,
    CCardHeader,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function TaskComponent({ task }) {

    return (
        <CCard>
            <TaskStatusHeader task={task} />
            <CCardHeader className='text-break text-justify'>
                {task.conclusion ? <s>{task.name}</s> : task.name}
                <div className="card-header-actions">
                    <GoTo go={'/tasks/' + task.id}>
                        <CIcon name="cil-task" />
                    </GoTo>
                </div>
            </CCardHeader>
        </CCard>
    )
}

