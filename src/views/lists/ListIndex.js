import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import ListCreate from './ListCreate'
import { ListComponent } from "../../components/"

import {
    AddButton,
    BreadcrumbHeader,
    Loading,
    Error,
    NoItems
} from '../../reusable/'

export default function ListIndex() {

    const { authUser } = useAuth()

    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const [lists, setLists] = useState([])

    const fetchLists = useCallback(async () => {
        try {
            const { data: lists, error } = await supabase
                .from("lists")
                .select("*")
                .eq('user_id', authUser.id)
                .order("created_at", { ascending: false });
            if (error) {
                setErrors(prev => [...prev, error.message])
            }
            else {
                setLists(lists)
            }
        } catch (error) {
            setErrors(prev => [...prev, error.message])
        }
        setLoading(false)
    }, [authUser.id])

    useEffect(() => {
        fetchLists()
    }, [fetchLists])

    if (loading) return (<Loading />)

    if (errors.length > 0) return (<Error errors={errors} />)

    return (
        <>
            <BreadcrumbHeader title="Listas" quantidade={lists.length} >
                <AddButton component={<ListCreate add={list => setLists([list, ...lists])} />} />
            </BreadcrumbHeader>
            {lists <= 0 ? <NoItems /> :
                lists.map(list => (<ListComponent key={list.id} list={list} />))
            }
        </>
    )
}