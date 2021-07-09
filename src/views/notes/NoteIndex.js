import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import NoteCreate from './NoteCreate'

import {
    AddButton,
    BreadcrumbHeader,
    Loading,
    NoItems,
} from '../../reusable'

import {
    NoteComponent,
} from "../../components/"

export default function NoteIndex({ linkId }) {

    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])

    const fetchNotes = useCallback(async () => {
        const { data: notes, errorNotes } = await supabase
            .from("notes")
            .select("*")
            .eq('link_id', linkId)
            .order("created_at", { ascending: false });
        if (errorNotes) {
            console.log("errorNotes", errorNotes);
        } else {
            setNotes(notes)
        }
        setLoading(false)
    }, [linkId])

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    if (loading) return (<Loading />)

    return (
        <>
            <BreadcrumbHeader title="Anotações" quantidade={notes.length}>
                <AddButton
                    component={<NoteCreate linkId={linkId} add={note => setNotes([note, ...notes])} />}
                />
            </BreadcrumbHeader>
            {notes <= 0 ? <NoItems /> :
                notes.map(note => (<NoteComponent key={note.id} note={note} />))
            }
        </>
    )
}