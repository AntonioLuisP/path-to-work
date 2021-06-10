import React from 'react'

import {
    CCallout
} from '@coreui/react'

export default function CommentComponent(props) {

    const comment = props.comment

    return (
        <CCallout className='b-t-1 b-r-1 b-b-1' color="info">
            <p className="text-muted">Lubuck diz:</p>
            <p className="text-justify">{comment.comment}</p>
        </CCallout>
    )
}


