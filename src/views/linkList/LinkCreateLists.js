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

export default function LinkCreateLists({ linkId, add, remove }) {

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
            const { data: allRelations, errorRelations } = await supabase
                .from("list_links")
                .select("list_id, lists(*)")
                .eq('link_id', linkId)
                .order("created_at", { ascending: false });
            if (errorRelations) {
                console.log("errorRelations", errorRelations);
            } else {
                const partsedRelations = Object.entries(allRelations).map(([key, value]) => {
                    return value.lists
                })
                setLists(allLists.map(list => {
                    if (partsedRelations.some(relation => relation.id === list.id)) {
                        return { ...list, 'selected': true }
                    }
                    return list
                }))
            }
            setLoading(false)
        }
    }, [linkId])

    async function toogleSelect(e, list) {
        e.preventDefault();
        if (list.selected) {
            await removeRelation(list)
        } else {
            await addRelation(list)
        }
    }

    async function removeRelation(list) {
        const { error } = await supabase
            .from('list_links')
            .delete()
            .eq('link_id', linkId)
            .eq('list_id', list.id)
        if (error) {
            console.log("error: ", error)
        } else {
            remove(list)
            redoAfterToogle(list)
        }
    }

    async function addRelation(list) {
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
            add(list)
            redoAfterToogle(list)
        }
    }

    function redoAfterToogle(data) {
        setLists(lists.map(list => {
            if (list.id === data.id) {
                return { ...data, 'selected': !data.selected }
            }
            return { ...list }
        }))
    }

    useEffect(() => {
        fetchLists()
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
                            lists.map(list => <SearchComponent key={list.id} data={list} toogleSelect={toogleSelect} />)
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
        </>
    )
}