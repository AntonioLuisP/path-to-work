import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import NoteCreate from './NoteCreate'

import {
    AddButton,
    BreadcrumbHeader,
    Loading,
    Error,
    NoItems,
} from '../../reusable'

import {
    NoteComponent,
} from "../../components/"

export default function NoteIndex({ linkId }) {

    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const [notes, setNotes] = useState([])

    const fetchNotes = useCallback(async () => {
        try {
            const { data: notes, errorNotes } = await supabase
                .from("notes")
                .select("*")
                .eq('link_id', linkId)
                .order("created_at", { ascending: false });
            if (errorNotes) {
                setErrors(prev => [...prev, errorNotes.message])
            } else {
                setNotes(notes)
            }
        } catch (error) {
            setErrors(prev => [...prev, error.message])
        }
        setLoading(false)
    }, [linkId])

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    function removeNote(item) {
        setNotes(notes => notes.filter(note => note.id !== item.id))
    }

    if (loading) return (<Loading />)

    if (errors.length > 0) return (<Error errors={errors} />)

    return (
        <>
            <BreadcrumbHeader title="Anotações" quantidade={notes.length}>
                <AddButton
                    component={<NoteCreate linkId={linkId} add={note => setNotes([note, ...notes])} />}
                />
            </BreadcrumbHeader>
            {notes <= 0 ? <NoItems /> :
                notes.map(note => (
                    <NoteComponent
                        key={note.id}
                        note={note}
                        remove={note => removeNote(note)}
                    />
                ))
            }
        </>
    )
}