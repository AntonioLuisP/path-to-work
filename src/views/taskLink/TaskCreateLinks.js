import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../../reusable'
import { ToogleComponent } from 'src/components'

import {
    CModalBody,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CCol
} from '@coreui/react'

export default function TaskCreateLinks({ taskId, add, remove }) {

    const { user } = useAuth()

    const [loading, setLoading] = useState(true)
    const [links, setLinks] = useState([])

    const fetchLinks = useCallback(async () => {
        const { data: allLinks, error } = await supabase
            .from("links")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            const { data: allRelations, errorRelations } = await supabase
                .from("task_links")
                .select("task_id, links(*)")
                .eq('task_id', taskId)
                .order("created_at", { ascending: false });
            if (errorRelations) {
                console.log("errorRelations", errorRelations);
            } else {
                const partsedRelations = Object.entries(allRelations).map(([key, value]) => {
                    return value.links
                })
                setLinks(allLinks.map(link => {
                    return partsedRelations.some(relation => relation.id === link.id) ?
                        { ...link, 'selected': true } :
                        { ...link, 'selected': false }
                }))
            }
            setLoading(false)
        }
    }, [taskId])

    async function toogleSelect(e, link) {
        e.preventDefault();
        if (link.selected) {
            await removeRelation(link)
        } else {
            await addRelation(link)
        }
    }

    async function removeRelation(link) {
        const { error } = await supabase
            .from('task_links')
            .delete()
            .eq('task_id', taskId)
            .eq('link_id', link.id)
        if (error) {
            console.log("error: ", error)
        } else {
            remove(link)
            redoAfterToogle(link)
        }
    }

    async function addRelation(link) {
        const { error } = await supabase
            .from("task_links")
            .insert({
                task_id: taskId,
                link_id: link.id,
                user_id: user.id
            })
            .single();
        if (error) {
            alert("error", error)
            return;
        } else {
            add(link)
            redoAfterToogle(link)
        }
    }

    function redoAfterToogle(data) {
        setLinks(links.map(link => {
            if (link.id === data.id) {
                return { ...data, 'selected': !data.selected }
            }
            return { ...link }
        }))
    }

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

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
                            links.map(link => <ToogleComponent key={link.id} data={link} toogleSelect={toogleSelect} />)
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
        </>
    )
}