import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';

import {
  Loading,
} from '../../reusable'

import {
  CRow,
} from '@coreui/react'

export default function List() {

  const { authUser } = useAuth()

  const [loading, setLoading] = useState(true)

  const [list, setProfile] = useState({})

  const fetchProfile = useCallback(async () => {
    const { data: list, error } = await supabase
      .from("lists")
      .select("*")
      .eq('user_id', authUser.id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      setProfile(list)
    }
    setLoading(false)
  }, [authUser.id])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading) return (<Loading />)

  if (list.id === undefined) return (<> Perfil não encontrado</>)

  return (
    <CRow>

      oba

    </CRow>
  )
}