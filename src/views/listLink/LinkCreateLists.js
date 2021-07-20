import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import { Loading, Error } from '../../reusable'
import { ToogleComponent } from '../../components'

import {
    CModalBody,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CCol
} from '@coreui/react'

export default function LinkCreateLists({ linkId, add, remove }) {

    const { authUser } = useAuth()

    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const [lists, setLists] = useState([])

    const fetchLists = useCallback(async () => {
        try {
            const { data: allLists, error } = await supabase
                .from("lists")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) {
                setErrors(prev => [...prev, error.message])
            }
            else {
                const { data: allRelations, errorRelations } = await supabase
                    .from("list_links")
                    .select("list_id, lists(*)")
                    .eq('link_id', linkId)
                    .order("created_at", { ascending: false });
                if (errorRelations) {
                    setErrors(prev => [...prev, errorRelations.message])
                } else {
                    const partsedRelations = Object.entries(allRelations).map(([key, value]) => {
                        return value.lists
                    })
                    setLists(allLists.map(list => {
                        return partsedRelations.some(relation => relation.id === list.id) ?
                            { ...list, 'selected': true } :
                            { ...list, 'selected': false }
                    }))
                }
            }
        } catch (error) {
            setErrors(prev => [...prev, error.message])
        }
        setLoading(false)
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
        try {
            const { error } = await supabase
                .from('list_links')
                .delete()
                .eq('link_id', linkId)
                .eq('list_id', list.id)
            if (error) {
                setErrors(prev => [...prev, error.message])
            } else {
                remove(list)
                redoAfterToogle(list)
            }
        } catch (error) {
            setErrors(prev => [...prev, error.message])
        }
    }

    async function addRelation(list) {
        try {
            const { error } = await supabase
                .from("list_links")
                .insert({
                    link_id: linkId,
                    list_id: list.id,
                    user_id: authUser.id
                })
                .single();
            if (error) {
                setErrors(prev => [...prev, error.message])
            } else {
                add(list)
                redoAfterToogle(list)
            }
        } catch (error) {
            setErrors(prev => [...prev, error.message])
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

    if (errors.length > 0) return (<Error errors={errors} />)

    return (
        <>
            <CModalHeader closeButton>
                <CModalTitle>Adicionar Lista</CModalTitle>
            </CModalHeader >
            <CModalBody>
                <CFormGroup row>
                    <CCol md="12">
                        {
                            lists.map(list => <ToogleComponent key={list.id} data={list} toogleSelect={toogleSelect} />)
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
        </>
    )
}