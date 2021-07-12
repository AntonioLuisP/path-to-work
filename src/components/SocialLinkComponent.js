import React from 'react'

import {
    CLink
} from '@coreui/react'

export default function SocialLinkComponent({ link }) {

    return (
        <CLink
            size='lg'
            className='btn btn-info bg-gradient-info btn-block'
            target='_blank'
            rel="noreferrer noopener"
            href={link.url} >
            <h3 className="pt-1 text-break text-center">
                {link.name.length >= 50 ? link.name.substring(0, 49) + ' ...' : link.name}
            </h3>
        </CLink>
    )
}


