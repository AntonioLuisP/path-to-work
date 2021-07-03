import React from 'react'
import { useHistory } from 'react-router-dom'
import { GoTo } from '../reusable'

import {
    CCardHeader,
    CCard,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function ListComponent({ list }) {

    const history = useHistory()

    return (
        <CCard>
            <CCardHeader className='text-break text-justify'>
                {list.name}
                <div className="card-header-actions">
                    <GoTo action={() => history.push('/lists/' + list.id)}>
                        <CIcon name="cil-list" />
                    </GoTo>
                </div>
            </CCardHeader>
        </CCard>
    )
}


