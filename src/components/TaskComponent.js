import React from 'react'
import { GoTo } from '../reusable'

import {
    CCard,
    CCardHeader,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function TaskComponent({ task }) {

    return (
        <CCard>
            <CCardHeader className='text-break text-justify'>
                {task.conclusion ?
                    <s>{task.name.length >= 50 ? task.name.substring(0, 174) + ' ...' : task.name}</s> :
                    task.name.length >= 50 ? task.name.substring(0, 174) + ' ...' : task.name
                }
                <div className="card-header-actions">
                    <GoTo go={'/tasks/' + task.id}>
                        <CIcon name="cil-task" />
                    </GoTo>
                </div>
            </CCardHeader>
        </CCard>
    )
}

