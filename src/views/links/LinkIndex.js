import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import LinkCreate from './LinkCreate'
import { LinkComponent } from '../../components/'

import {
  BreadcrumbHeader,
  Loading,
  NoItems,
  Error,
  AddButton
} from '../../reusable/'

export default function LinkIndex() {

  const { authUser } = useAuth()

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])

  const [links, setLinks] = useState([])

  const fetchLinks = useCallback(async () => {
    try {
      const { data: links, error } = await supabase
        .from("links")
        .select("*")
        .eq('user_id', authUser.id)
        .order("created_at", { ascending: false });
      if (error) {
        setErrors(prev => [...prev, error.message])
      }
      else {
        setLinks(links)
      }
    } catch (error) {
      setErrors(prev => [...prev, error.message])
    }
    setLoading(false)
  }, [authUser.id])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) return (<Loading />)

  if (errors.length > 0) return (<Error errors={errors} />)

  return (
    <>
      <BreadcrumbHeader title="Links" quantidade={links.length} >
        <AddButton component={<LinkCreate add={link => setLinks([link, ...links])} />} />
      </BreadcrumbHeader>
      {links <= 0 ? <NoItems /> :
        links.map(link => (<LinkComponent key={link.id} link={link} />))
      }
    </>
  )
}