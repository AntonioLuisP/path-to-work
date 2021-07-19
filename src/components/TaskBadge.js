import React from 'react'
import useTaskStatus from '../hooks/useTaskStatus'

import {
    CBadge,
} from '@coreui/react'

export default function TaskBadge({ conclusion, dayOf }) {

    const { taskInfo } = useTaskStatus(conclusion, dayOf)

    return (
        <>
            {taskInfo ?
                <CBadge color={taskInfo.color} children={taskInfo.message} />
                : <></>
            }
        </>
    )
}