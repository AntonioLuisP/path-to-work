import React from 'react'

import {
    CListGroup,
    CCard,
    CListGroupItem,
} from '@coreui/react'

export default function LinkInfo(props) {

    const link = props.link

    return (
        <CCard>
            <CListGroup flush>
                <CListGroupItem>
                    Informações
                </CListGroupItem>
                <CListGroupItem>
                    Criado em: {link.created_at}
                </CListGroupItem>
                <CListGroupItem>
                    Editado em: {link.updated_at}
                </CListGroupItem>
            </CListGroup>
        </CCard>
    )
}