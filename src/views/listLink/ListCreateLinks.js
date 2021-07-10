import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../../reusable'
import { SearchComponent } from 'src/components'

import {
    CModalBody,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CCol
} from '@coreui/react'

export default function ListCreateLinks({ listId, add, remove }) {

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
                .from("list_links")
                .select("list_id, links(*)")
                .eq('list_id', listId)
                .order("created_at", { ascending: false });
            if (errorRelations) {
                console.log("errorRelations", errorRelations);
            } else {
                const partsedRelations = Object.entries(allRelations).map(([key, value]) => {
                    return value.links
                })
                setLinks(allLinks.map(link => {
                    if (partsedRelations.some(relation => relation.id === link.id)) {
                        return { ...link, 'selected': true }
                    }
                    return link
                }))
            }
            setLoading(false)
        }
    }, [listId])

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
            .from('list_links')
            .delete()
            .eq('list_id', listId)
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
            .from("list_links")
            .insert({
                list_id: listId,
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
                            links.map(link => <SearchComponent key={link.id} data={link} toogleSelect={toogleSelect} />)
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
        </>
    )
}