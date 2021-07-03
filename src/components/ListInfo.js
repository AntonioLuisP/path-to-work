import React from 'react'

import {
    CListGroup,
    CCard,
    CCardHeader,
    CListGroupItem,
} from '@coreui/react'

export default function ListInfo({ list, children }) {

    return (
        <CCard>
            <CCardHeader color="secondary">
                Informações {children}
            </CCardHeader>
            <CListGroup>
                <CListGroupItem>
                    Criado em: {list.created_at}
                </CListGroupItem>
                <CListGroupItem>
                    Editado em: {list.updated_at === null ? 'Sem data' : list.updated_at}
                </CListGroupItem>
            </CListGroup>
        </CCard>
    )
}