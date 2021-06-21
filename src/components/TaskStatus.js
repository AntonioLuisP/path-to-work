import React from 'react'
import TaskStatusHeader from './TaskStatusHeader'
import TaskStatusFooter from './TaskStatusFooter'

import {
    CCard,
} from '@coreui/react'

export default function TaskStatus(props) {

    const task = props.task
    const links = props.links
    const todos = props.todos
    const comments = props.comments

    return (
        <CCard>
            <TaskStatusHeader task={task} />
            <TaskStatusFooter todos={todos} links={links} comments={comments} />
        </CCard>
    )
}