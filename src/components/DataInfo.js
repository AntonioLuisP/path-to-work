import React from 'react'
import { formatDate } from '../services/FormatDate'

import {
    CListGroup,
    CCard,
    CCardHeader,
    CListGroupItem,
} from '@coreui/react'

export default function DataInfo({ data, children, buttons }) {

    return (
        <CCard>
            <CCardHeader color="secondary">
                Informações {buttons}
            </CCardHeader>
            <CListGroup>
                {children}
                <CListGroupItem>
                    Criado em: {formatDate(data.created_at)}
                </CListGroupItem>
                <CListGroupItem>
                    Editado em: {data.updated_at === null ? 'Sem data' : formatDate(data.updated_at)}
                </CListGroupItem>
            </CListGroup>
        </CCard>
    )
}