import React from 'react'
import TaskStatusHeader from './TaskStatusHeader'
import TaskStatusFooter from './TaskStatusFooter'

import {
    CCard,
} from '@coreui/react'

export default function TaskStatus({ task, links, todos, comments }) {

    return (
        <CCard>
            <TaskStatusHeader task={task} />
            <TaskStatusFooter todos={todos} links={links} comments={comments} />
        </CCard>
    )
}