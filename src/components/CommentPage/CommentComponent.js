import React from 'react'

import {
    CCallout
} from '@coreui/react'

export default function CommentComponent(props) {

    const comment = props.comment

    return (
        <CCallout color="info">
            <p className="text-muted">Lubuck diz:</p>
            <p className="text-justify">{comment.comment}</p>
        </CCallout>
    )
}


