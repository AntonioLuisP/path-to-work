import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../services/supabase'

import {
    Footer,
} from '../../containers'

import {
    SocialLinkComponent,
} from "../../components"

import {
    Loading,
    NoItems,
} from '../../reusable'

import {
    CCol,
    CContainer,
    CRow
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
        <div className="c-app c-default-layout align-items-center">
            <div className="c-wrapper">
                <div className="c-body">
                    <CContainer>
                        <CRow className="justify-content-center">
                            <CCol md="6">
                                <h1 className="pt-4">{id}</h1>
                                {links <= 0 ? <NoItems /> :
                                    links.map(link => (<SocialLinkComponent key={link.id} link={link} />))
                                }
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
                <Footer />
            </div>
        </div>
    )
}