import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import ListCreate from './ListCreate'
import { ListComponent } from "../../components/"
import {
    AddButton,
    BreadcrumbHeader,
    Loading,
    NoItems
} from '../../reusable/'

export default function ListIndex() {

    const [loading, setLoading] = useState(true)
    const [lists, setLists] = useState([])

    const fetchLists = useCallback(async () => {
        const { data: lists, error } = await supabase
            .from("lists")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            setLists(lists)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchLists()
    }, [fetchLists])

    if (loading) return (<Loading />)

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