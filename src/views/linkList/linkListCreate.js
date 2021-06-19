import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from "../../services/api"
import { Loading } from '../../reusable/'

import {
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
} from '@coreui/react'

export default function LinkListCreate() {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const [listsSearch, setListsSearch] = useState([])
    const lists = useSelector(state => state.lists)

    useEffect(() => {
        api.get('list')
            .then(response => {
                if (response.status === 200) {
                    setListsSearch(response.data.data)
                }
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        setLoading(false)
    }, [dispatch])

    if (loading) return (<Loading />)

    return (
        <CDropdown >
            <CDropdownToggle className="card-header-action">
                <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem onClick={editAction}>
                    <p><CIcon content={cilPen} />{' '}Editar</p>
                </CDropdownItem>
                <CDropdownItem onClick={deleteAction}>
                    <p><CIcon content={cilTrash} />{' '}Deletar</p>
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}