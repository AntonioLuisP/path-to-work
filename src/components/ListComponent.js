import React from 'react'
import { GoTo } from '../reusable'

import {
    CCardHeader,
    CCard,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function ListComponent({ list }) {

    return (
        <CCard>
            <CCardHeader className='text-break text-justify'>
                {list.name.length >= 50 ? list.name.substring(0, 174) + ' ...' : list.name}
                <div className="card-header-actions">
                    <GoTo go={'/lists/' + list.id}>
                        <CIcon name="cil-list" />
                    </GoTo>
                </div>
            </CCardHeader>
        </CCard>
    )
}


