import React from 'react'
import TaskStatusHeader from './TaskStatusHeader'
import TaskStatusFooter from './TaskStatusFooter'

import {
    CCard,
} from '@coreui/react'

export default function TaskStatus({ task, links, todos, comments }) {

    return (
        <CCard>
            <TaskStatusHeader conclusion={task.conclusion} dayOf={task.day_of} />
            <TaskStatusFooter todos={todos} links={links} comments={comments} />
        </CCard>
    )
}