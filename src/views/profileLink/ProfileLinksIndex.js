import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import LinkCreate from '../links/LinkCreate'
import ListCreateLinks from './ProfileCreateLinks'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
    BreadcrumbHeader,
    Loading,
    NoItems,
    AddButton,
    GoTo,
    ShareButton,
    RelationButton
} from '../../reusable'

import {
    LinkComponent,
} from "../../components"

import {
    cilContact,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function ProfileLinksIndex({ profileId, profileName, children }) {

    const dispatch = useDispatch()

    const { authUser } = useAuth()

    const [loading, setLoading] = useState(true)
    const [links, setLinks] = useState([])

    const fetchLinks = useCallback(async () => {
        const { data: links, errorLinks } = await supabase
            .from("profile_links")
            .select("profile_id, links(*)")
            .eq('profile_id', profileId)
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
    }, [profileId])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])


    function addLink(link) {
        setLinks(links => [link, ...links])
    }

    function removeLink(item) {
        setLinks(links => links.filter(link => link.id !== item.id))
    }

    async function handleCreateRelationProfileLink(link) {
        const { error } = await supabase
            .from("profile_links")
            .insert({
                link_id: link.id,
                profile_id: profileId,
                user_id: authUser.id
            })
            .single();
        if (error) {
            alert("error", error)
            return;
        } else {
            addLink(link)
            dispatch(ActionNotification.addOne({
                header: 'Link adicionado ao Perfil:',
                body: link.name,
                id: link.id,
            }))
        }
        return;
    }

    if (loading) return (<Loading />)

    return (
        <>
            <BreadcrumbHeader title={(<strong>{profileName}</strong>)} >
                {children}
                <GoTo go={'/social/' + profileName}>
                    <CIcon content={cilContact} width={20} />
                </GoTo>
                <ShareButton name={profileName} />
                <RelationButton
                    component={
                        <ListCreateLinks profileId={profileId}
                            add={link => addLink(link)}
                            remove={link => removeLink(link)}
                        />
                    }
                />
                <AddButton component={<LinkCreate add={link => handleCreateRelationProfileLink(link)} />} />
            </BreadcrumbHeader>
            {links <= 0 ? <NoItems /> :
                links.map(link => (<LinkComponent key={link.id} link={link} />))
            }
        </>
    )
}