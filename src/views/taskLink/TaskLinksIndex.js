import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import LinkCreate from '../links/LinkCreate'
import ListCreateLinks from './TaskCreateLinks'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
    BreadcrumbHeader,
    Loading,
    Error,
    NoItems,
    AddButton,
    RelationButton
} from '../../reusable'

import {
    LinkComponent,
} from "../../components"

export default function TaskLinksIndex({ taskId, linksQtd }) {

    const dispatch = useDispatch()

    const { authUser } = useAuth()

    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const [links, setLinks] = useState([])

    const fetchLinks = useCallback(async () => {
        try {
            const { data: links, errorLinks } = await supabase
                .from("task_links")
                .select("task_id, links(*)")
                .eq('task_id', taskId)
                .order("created_at", { ascending: false });
            if (errorLinks) {
                setErrors(prev => [...prev, errorLinks.message])
            } else {
                const parsedLinks = Object.entries(links).map(([key, value]) => {
                    return value.links
                })
                setLinks(parsedLinks)
            }
        } catch (error) {
            setErrors(prev => [...prev, error.message])
        }
        setLoading(false)
    }, [taskId])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    useEffect(() => {
        linksQtd(links.length)
    }, [links, linksQtd])

    function addLink(link) {
        setLinks(links => [link, ...links])
    }

    function removeLink(item) {
        setLinks(links => links.filter(link => link.id !== item.id))
    }

    async function handleCreateRelationTaskLink(link) {
        try {
            const { error } = await supabase
                .from("task_links")
                .insert({
                    link_id: link.id,
                    task_id: taskId,
                    user_id: authUser.id
                })
                .single();
            if (error) {
                alert("Não foi possivel salvar a informação. Motivo: ", error.message)
                return;
            } else {
                addLink(link)
                dispatch(ActionNotification.addOne({
                    header: 'Link adicionada a Tarefa:',
                    body: link.name,
                    id: link.id,
                }))
            }
        } catch (error) {
            alert("Não foi possivel salvar a informação. Motivo: ", error.message)
            return;
        }
    }

    if (loading) return (<Loading />)

    if (errors.length > 0) return (<Error errors={errors} />)

    return (
        <>
            <BreadcrumbHeader title='Links da Tarefa' quantidade={links.length}  >
                <RelationButton
                    component={
                        <ListCreateLinks taskId={taskId}
                            add={link => addLink(link)}
                            remove={link => removeLink(link)}
                        />
                    }
                />
                <AddButton component={<LinkCreate add={link => handleCreateRelationTaskLink(link)} />} />
            </BreadcrumbHeader>
            {links <= 0 ? <NoItems /> :
                links.map(link => (<LinkComponent key={link.id} link={link} />))
            }
        </>
    )
}