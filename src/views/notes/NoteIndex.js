import React, { useState, useEffect, useCallback } from 'react'
import { NoteComponent } from '../../components/'
import { supabase } from '../../services/supabase'
import { Loading } from '../../reusable'

export default function NoteIndex() {

  const [loading, setLoading] = useState(true)
  const [notes, setnotes] = useState([])

  const fetchNotes = useCallback(async () => {
    const { data: notes, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("error", error);
    }
    else {
      setnotes(notes)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  if (loading) return (<Loading />)

  return (
    <>
      {
        notes.map(note => (
          <NoteComponent key={note.id} note={note} />
        ))
      }
    </>
  )
}