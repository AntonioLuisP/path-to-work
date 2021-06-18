import React from 'react'

import {
    CCallout
} from '@coreui/react'

export default function ListComponent(props) {

    const list = props.list

    return (
        <CCallout className='b-t-1 b-r-1 b-b-1 text-break text-justify' color="info">
            <p className="text-justify">{list.name}</p>
        </CCallout>
    )
}


