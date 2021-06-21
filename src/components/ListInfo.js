import React from 'react'

import {
    CListGroup,
    CCard,
    CListGroupItem,
} from '@coreui/react'

export default function ListInfo(props) {

    const list = props.list

    return (
        <CCard>
            <CListGroup flush>
                <CListGroupItem>
                    Informações
                </CListGroupItem>
                <CListGroupItem>
                    Criado em: {list.created_at}
                </CListGroupItem>
                <CListGroupItem>
                    Editado em: {list.updated_at}
                </CListGroupItem>
            </CListGroup>
        </CCard>
    )
}