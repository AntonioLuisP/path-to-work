import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import LinkCreate from '../links/LinkCreate'
import ListCreateLinks from './ListCreateLinks'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
    BreadcrumbHeader,
    Loading,
    NoItems,
    AddButton,
    RelateButton
} from '../../reusable'

import {
    LinkComponent,
} from "../../components"

export default function ListLinksIndex({ listId }) {

    const dispatch = useDispatch()

    const { user } = useAuth()

    const [loading, setLoading] = useState(true)
    const [links, setLinks] = useState([])

    const fetchLinks = useCallback(async () => {
        const { data: links, errorLinks } = await supabase
            .from("list_links")
            .select("list_id, links(*)")
            .eq('list_id', listId)
            .order("created_at", { ascending: false });
        if (errorLinks) {
            console.log("errorLinks", errorLinks);
        } else {
            const parsedLinks = Object.entries(links).map(([key, value]) => {
                return value.links
            })
            setLinks(parsedLinks)
        }
        setLoading(false)
    }, [listId])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    async function handleCreateRelationListLink(link) {
        const { error } = await supabase
            .from("list_links")
            .insert({
                link_id: link.id,
                list_id: listId,
                user_id: user.id
            })
            .single();
        if (error) {
            alert("error", error)
            return;
        } else {
            setLinks([link, ...links])
            dispatch(ActionNotification.addOne({
                header: 'Link adicionada a Lista:',
                body: link.name,
                id: link.id,
            }))
        }
        return;
    }

    if (loading) return (<Loading />)

    return (
        <>
            <BreadcrumbHeader title='Links' quantidade={links.length}  >
                <RelateButton component={<ListCreateLinks listId={listId} relations={links} add={link => setLinks(links => [link, ...links])} retorno={links => setLinks(links)} />} />
                <AddButton component={<LinkCreate add={link => handleCreateRelationListLink(link)} />} />
            </BreadcrumbHeader>
            {links <= 0 ? <NoItems /> :
                links.map(link => (<LinkComponent key={link.id} link={link} />))
            }
        </>
    )
}