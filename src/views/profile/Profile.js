import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import ProfileCreate from './ProfileCreate';
import ProfileEdit from './ProfileEdit';
import ProfileLinksIndex from '../profileLink/ProfileLinksIndex';

import {
  Loading,
  Error,
  CollapseDescription
} from '../../reusable'

import {
  CCollapse
} from '@coreui/react'

export default function Profile() {

  const { authUser } = useAuth()

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  const [profile, setProfile] = useState({})

  const fetchProfile = useCallback(async () => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq('user_id', authUser.id)
        .single()
      if (!error) {
        setProfile(profile)
      }
    } catch (error) {
      setErrors(prev => [...prev, error.message])
    }
    setLoading(false)
  }, [authUser.id])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading) return (<Loading />)

  if (errors.length > 0) return (<Error errors={errors} />)

  if (profile.id === undefined) {
    return (<ProfileCreate add={profile => setProfile(profile)} />)
  }

  return (
    <>
      <CCollapse show={collapsed}>
        <ProfileEdit profile={profile} edit={profile => setProfile(profile)} />
      </CCollapse>
      <ProfileLinksIndex profileId={profile.id} profileName={profile.name} >
        <CollapseDescription status={collapsed} action={() => setCollapsed(!collapsed)} />
      </ProfileLinksIndex>
    </>
  )
}