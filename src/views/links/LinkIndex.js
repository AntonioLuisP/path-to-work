import React, { useState, useEffect, useCallback } from 'react'
import { LinkComponent } from '../../components/'
import { supabase } from '../../services/supabase'
import { Loading } from '../../reusable'

export default function LinkIndex() {

  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState([])

  const fetchLinks = useCallback(async () => {
    const { data: links, error } = await supabase
      .from("links")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("error", error);
    }
    else {
      setLinks(links)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) return (<Loading />)

  return (
    <>
      {
        links.map(link => (
          <LinkComponent key={link.id} link={link} />
        ))
      }
    </>
  )
}