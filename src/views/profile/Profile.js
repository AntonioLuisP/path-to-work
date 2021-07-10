import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';

import {
  Loading,
} from '../../reusable'

import {
  CRow,
} from '@coreui/react'

export default function Profile() {

  const { authUser } = useAuth()

  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState({})

  const fetchProfile = useCallback(async () => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq('user_id', authUser.id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      setProfile(profile)
    }
    setLoading(false)
  }, [authUser.id])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading) return (<Loading />)

  if (profile.id === undefined) return (<> Perfil não encontrado</>)

  return (
    <CRow>

      oba

    </CRow>
  )
}