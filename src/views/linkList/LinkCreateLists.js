import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { Loading } from '../../reusable'
import { SearchComponent } from 'src/components'

import {
    CModalBody,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CCol
} from '@coreui/react'

export default function LinkCreateLists() {

    const [loading, setLoading] = useState(true)
    const [datas, setDatas] = useState([])

    const fetchDatas = useCallback(async () => {
        const { data: lists, error } = await supabase
            .from('lists')
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            console.log(lists)
            setDatas(lists)
        }
        setLoading(false)
    }, [])

    async function toogleSelect(e) {
        e.preventDefault();
    }

    useEffect(() => {
        fetchDatas()
    }, [fetchDatas])

    if (loading) return (<Loading />)

    return (
        <>
            <CModalHeader closeButton>
                <CModalTitle>Adicionar Lista</CModalTitle>
            </CModalHeader >
            <CModalBody>
                <CFormGroup row>
                    <CCol md="12">
                        {
                            datas.map(data => <SearchComponent data={data} toogleSelect={toogleSelect} />)
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
        </>
    )
}