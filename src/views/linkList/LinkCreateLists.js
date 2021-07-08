import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { Loading } from '../../reusable'
import { SearchComponent } from '../../components'

import {
    CModalBody,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CCol
} from '@coreui/react'

export default function LinkCreateLists({ id }) {

    const [loading, setLoading] = useState(true)
    const [lists, setLists] = useState([])
    const [relatedlists, setRelatedLists] = useState([])

    const fetchLists = useCallback(async () => {
        const { data: lists, error } = await supabase
            .from("lists")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            setLists(lists)
        }
    }, [])

    const fetchRelatedLists = useCallback(async () => {
        const { data: lists, errorLists } = await supabase
            .from("list_links")
            .select("list_id, lists(*)")
            .eq('link_id', id)
            .order("created_at", { ascending: false });
        if (errorLists) {
            console.log("errorLists", errorLists);
        }
        else {
            const parsedLists = Object.entries(lists).map(([key, value]) => {
                return value.lists
            })
            setRelatedLists(parsedLists)
        }
    }, [id])

    async function toogleSelect(e) {
        e.preventDefault();
    }

    useEffect(() => {
        fetchLists()
        fetchRelatedLists()
        setLoading(false)
        return () => {
            setLists([])
            setRelatedLists([])
        }
    }, [fetchLists, fetchRelatedLists])

    if (loading) return (<><Loading /></>)

    return (
        <>
            <CModalHeader closeButton>
                <CModalTitle>Adicionar Lista</CModalTitle>
            </CModalHeader >
            <CModalBody>
                <CFormGroup row>
                    <CCol md="12">
                        {
                            lists.map(data => <SearchComponent data={data} toogleSelect={toogleSelect} />)
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
        </>
    )
}