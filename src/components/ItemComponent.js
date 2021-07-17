import React from 'react'
import { GoTo } from '../reusable'

import {
    CCardHeader,
    CCard,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function ItemComponent({ name, to, children }) {

    return (
        <CCard>
            <CCardHeader className='text-break text-justify'>
                {name.length >= 50 ? name.substring(0, 169) + ' ...' : name}
                <div className="card-header-actions">
                    {children}
                    <GoTo go={to}>
                        <CIcon name="cil-arrow-right"/>
                    </GoTo>
                </div>
            </CCardHeader>
        </CCard>
    )
}


