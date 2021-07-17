import React from 'react'

import {
    CCard,
    CCardHeader,
    CCardBody,
    CCollapse
} from '@coreui/react'

const Principal = ({ name, description = null, collapsed = false, children }) => {

    return (
        <CCard className='text-break text-justify'>
            <CCardHeader color="secondary">
                {name}
                <div className="card-header-actions">
                    {children}
                </div>
            </CCardHeader>
            {
                description !== null ?
                    (<CCollapse show={collapsed}>
                        <CCardBody>
                            {description === '' ? 'Sem Descrição' : description}
                        </CCardBody>
                    </CCollapse>) :
                    ''
            }
        </CCard>
    )
}

export default React.memo(Principal)