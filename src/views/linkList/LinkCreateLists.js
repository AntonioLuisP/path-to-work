import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../../reusable'
import { SearchComponent } from '../../components'

import {
    CModalBody,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CCol
} from '@coreui/react'

export default function LinkCreateLists({ linkId, relations, retorno }) {

    const { user } = useAuth()

    const [loading, setLoading] = useState(true)
    const [lists, setLists] = useState([])

    const fetchLists = useCallback(async () => {
        const { data: allLists, error } = await supabase
            .from("lists")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            setLists(allLists.map(list => {
                return relations.some(relation => relation.id === list.id) ?
                    { ...list, 'selected': true } : { ...list, 'selected': false }
            }))
        }
    }, [relations])

    async function toogleSelect(e, list) {
        e.preventDefault();
        console.log('toogle')
        if (list.selected) {
            const { error } = await supabase
                .from('list_links')
                .delete()
                .eq('link_id', linkId)
                .eq('list_id', list.id)
            if (error) {
                console.log("error: ", error)
            } else {
                setLists(lists => {
                    lists.map(item => {
                        if (item.id === list.id) {
                            return { ...list, 'selected': !list.selected }
                        }
                        return list
                    })
                })
            }
        } else {
            const { error } = await supabase
                .from("list_links")
                .insert({
                    link_id: linkId,
                    list_id: list.id,
                    user_id: user.id
                })
                .single();
            if (error) {
                alert("error", error)
                return;
            } else {
                setLists(lists => {
                    lists.map(item => {
                        if (item.id === list.id) {
                            return { ...list, 'selected': !list.selected }
                        }
                        return list
                    })
                })
            }
        }
    }

    useEffect(() => {
        fetchLists()
        setLoading(false)
    }, [fetchLists])

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
                            lists.map(data => <SearchComponent key={data.id} data={data} toogleSelect={toogleSelect} />)
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
        </>
    )
}