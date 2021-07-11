import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../services/supabase'

import {
    Footer,
} from '../../containers'

import {
    LinkComponent,
} from "../../components"

import {
    Loading,
    NoItems,
} from '../../reusable'

import {
    CContainer,
    CHeader,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink
} from '@coreui/react'

export default function Social() {

    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [links, setLinks] = useState([])

    const fetchProfile = useCallback(async () => {
        setLoading(true)
        setLinks([])
        const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq('name', id)
            .single()
        if (error) {
            console.log("error", error);
        }
        else {
            const { data: links, errorLinks } = await supabase
                .from("profile_links")
                .select("profile_id, links(*)")
                .eq('profile_id', profile.id)
                .order("created_at", { ascending: false });
            if (errorLinks) {
                console.log("errorLinks", errorLinks);
            } else {
                const parsedLinks = Object.entries(links).map(([key, value]) => {
                    return value.links
                })
                setLinks(parsedLinks)
            }
        }
        setLoading(false)
    }, [id])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    if (loading) return (<Loading />)

    return (
        <div className="c-app c-default-layout">
            <div className="c-wrapper">
                <CHeader>
                    <CHeaderNav className="d-md-down-none mr-auto">
                        <CHeaderNavItem className="px-3" >
                            <CHeaderNavLink to="/home">Link Work</CHeaderNavLink>
                        </CHeaderNavItem>
                    </CHeaderNav>
                    <CHeaderNav className="px-3">
                        <CHeaderNavItem >
                            <CHeaderNavLink to="/login">Login</CHeaderNavLink>
                        </CHeaderNavItem>
                    </CHeaderNav>
                </CHeader>
                <div className="c-body">
                    <CContainer>
                        {id}
                        {links <= 0 ? <NoItems /> :
                            links.map(link => (<LinkComponent key={link.id} link={link} />))
                        }
                    </CContainer>
                </div>
                <Footer />
            </div>
        </div>
    )
}