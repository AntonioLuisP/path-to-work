import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../reusable'

import {
    CListGroupItem,
} from '@coreui/react'

export default function LinkComponent(props) {

    const history = useHistory()

    const link = props.link

    return (
        <CListGroupItem
            key={link.id}
            color='light'
        >
            <a
                target='_blank'
                rel="noreferrer noopener"
                href={link.url} >
                {link.name !== null ? link.name : link.url}
            </a>
            <More to={() => history.push('/links/' + link.id)} />
        </CListGroupItem>
    )
}


