import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import ListCreate from '../lists/ListCreate'
import LinkCreateLists from './LinkCreateLists'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
    BreadcrumbHeader,
    Loading,
    NoItems,
    AddButton,
    RelateButton
} from '../../reusable'

import {
    ListComponent,
} from "../../components"

export default function LinkListsIndex({ linkId }) {

    const dispatch = useDispatch()

    const { user } = useAuth()

    const [loading, setLoading] = useState(true)
    const [lists, setLists] = useState([])

    const fetchLists = useCallback(async () => {
        const { data: lists, errorLists } = await supabase
            .from("list_links")
            .select("list_id, lists(*)")
            .eq('link_id', linkId)
            .order("created_at", { ascending: false });
        if (errorLists) {
            console.log("errorLists", errorLists);
        } else {
            const parsedLists = Object.entries(lists).map(([key, value]) => {
                return value.lists
            })
            setLists(parsedLists)
        }
        setLoading(false)
    }, [linkId])

    useEffect(() => {
        fetchLists()
    }, [fetchLists])

    async function handleCreateRelationListLink(list) {
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
            setLists([list, ...lists])
            dispatch(ActionNotification.addOne({
                header: 'Link adicionada a Lista:',
                body: list.name,
                id: list.id,
            }))
        }
        return;
    }

    if (loading) return (<Loading />)

    return (
        <>
            <BreadcrumbHeader title="Listas" quantidade={lists.length} >
                <RelateButton component={<LinkCreateLists linkId={linkId} relations={lists} add={list => setLists(lists => [list, ...lists])} retorno={lists => setLists(lists)} />} />
                <AddButton component={<ListCreate add={list => handleCreateRelationListLink(list)} />} />
            </BreadcrumbHeader>
            {lists <= 0 ? <NoItems /> :
                lists.map(list => (<ListComponent key={list.id} list={list} />))
            }
        </>
    )
}