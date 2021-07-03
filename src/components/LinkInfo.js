import React from 'react'

import {
    CListGroup,
    CCard,
    CCardHeader,
    CListGroupItem,
} from '@coreui/react'

export default function LinkInfo({ link, children }) {

    return (
        <CCard>
            <CCardHeader color="secondary">
                Informações {children}
            </CCardHeader>
            <CListGroup>
                <CListGroupItem>
                    Criado em: {link.created_at}
                </CListGroupItem>
                <CListGroupItem>
                    Editado em: {link.updated_at === null ? 'Sem data' : link.updated_at}
                </CListGroupItem>
            </CListGroup>
        </CCard>
    )
}