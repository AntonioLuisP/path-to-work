import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../reusable'

import {
    CCard,
    CCardHeader,
} from '@coreui/react'

import {
    cilCursor,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function LinkComponent(props) {

    const history = useHistory()

    const link = props.link

    return (
        <CCard>
            <CCardHeader color='secondary' className='text-break text-justify'>
                <a
                    target='_blank'
                    rel="noreferrer noopener"
                    href={link.url} >
                    {link.name !== null ? link.name : link.url}
                </a>
                <More to={() => history.push('/links/' + link.id)}>
                    <CIcon width={18} content={cilCursor} />
                </More>
            </CCardHeader>
        </CCard>
    )
}


