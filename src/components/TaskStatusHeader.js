import React from 'react'
import useTaskStatus from '../hooks/useTaskStatus'

import {
    CCardHeader,
} from '@coreui/react'

export default function TaskStatusHeader({ conclusion, dayOf }) {

    const { taskInfo } = useTaskStatus(conclusion, dayOf)

    return (
        <>
            {taskInfo ?
                <CCardHeader className='content-center' color={taskInfo.color}>
                    <p className="my-2">{taskInfo.message}</p>
                </CCardHeader>
                : <></>
            }
        </>
    )
}