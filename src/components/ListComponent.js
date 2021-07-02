import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../reusable'

import {
    CCardHeader,
    CCard,
} from '@coreui/react'

import {
    cilList,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function ListComponent(props) {

    const history = useHistory()

    const list = props.list

    return (
        <CCard>
            <CCardHeader className='text-break text-justify'>
                {list.name}
                <More to={() => history.push('/lists/' + list.id)}>
                    <CIcon width={18} content={cilList} />
                </More>
            </CCardHeader>
        </CCard>
    )
}


