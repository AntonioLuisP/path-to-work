import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { Loading } from '../../reusable'
import LinkCreate from '../lists/LinkCreate'
import { SearchComponent } from 'src/components'

import {
    CModalBody,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CCol
} from '@coreui/react'

export default function ListCreateLinks() {

    const [loading, setLoading] = useState(true)
    const [datas, setDatas] = useState([])

    const fetchDatas = useCallback(async () => {
        const { data: links, error } = await supabase
            .from('links')
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            console.log(links)
            setDatas(links)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchDatas()
    }, [fetchDatas])

    if (loading) return (<Loading />)

    return (
        <>
            <CModalHeader closeButton>
                <CModalTitle>Adicionar Link</CModalTitle>
            </CModalHeader >
            <CModalBody>
                <CFormGroup row>
                    <CCol md="12">
                        {
                            datas.map(data => <SearchComponent data={data} toogleSelect={() => { }} />)
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
            <CModalBody>
            </CModalBody>
        </>
    )
}