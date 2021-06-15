import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../../reusable'

import {
    CCardBody,
    CCard,
    CCardText,
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
            <CCardBody>
                <CCardText className='text-break text-justify'>
                    <a
                        target='_blank'
                        rel="noreferrer noopener"
                        href={link.url} >
                        {link.name !== null ? link.name : link.url}
                    </a>
                </CCardText>
                <More to={() => history.push('/links/' + link.id)}>
                    <CIcon width={18} content={cilCursor} />
                </More>
            </CCardBody>
        </CCard>
    )
}


