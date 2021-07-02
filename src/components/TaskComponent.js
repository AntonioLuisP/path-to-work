import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../reusable'
import TaskStatusHeader from './TaskStatusHeader'

import {
    CCard,
    CCardHeader,
} from '@coreui/react'

import {
    cilTask,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskComponent({ task }) {

    const history = useHistory()

    return (
        <CCard>
            <TaskStatusHeader task={task} />
            <CCardHeader className='text-break text-justify'>
                {task.conclusion ? <s>{task.name}</s> : task.name}
                <More to={() => { history.push('/tasks/' + task.id) }}>
                    <CIcon width={18} content={cilTask} />
                </More>
            </CCardHeader>
        </CCard>
    )
}

