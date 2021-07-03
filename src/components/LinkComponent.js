import React from 'react'
import { useHistory } from 'react-router-dom'
import { Favorite, GoTo } from '../reusable'

import {
    CCard,
    CCardHeader,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function LinkComponent({ link }) {

    const history = useHistory()

    return (
        <CCard>
            <CCardHeader color='secondary' className='text-break text-justify'>
                <a
                    target='_blank'
                    rel="noreferrer noopener"
                    href={link.url} >
                    {link.name !== null ? link.name : link.url}
                </a>
                <div className="card-header-actions">
                    <Favorite link={link} />
                    <GoTo action={() => history.push('/links/' + link.id)}>
                        <CIcon name="cil-cursor" />
                    </GoTo>
                </div>
            </CCardHeader>
        </CCard>
    )
}


