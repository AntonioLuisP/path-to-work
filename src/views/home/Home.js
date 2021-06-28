import React from 'react'

import {
    TheFooter,
} from '../../containers'

import {
    CContainer,
    CHeader,
} from '@coreui/react'

export default function Home() {
    return (
        <div className="c-app c-default-layout">
            <div className="c-wrapper">
                <CHeader>

                </CHeader>
                <div className="c-body">
                    <CContainer>
                        HOME
                    </CContainer>
                </div>
                <TheFooter />
            </div>

        </div>
    )
}