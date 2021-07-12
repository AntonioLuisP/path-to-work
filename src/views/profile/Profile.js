import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import ProfileCreate from './ProfileCreate';
import ProfileEdit from './ProfileEdit';
import ProfileLinksIndex from '../profileLink/ProfileLinksIndex';

import {
  Loading,
  Modal,
  GoTo,
  EditButton,
  ShareButton
} from '../../reusable'

import {
  cilContact,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function Profile() {

  const history = useHistory()

  const { authUser } = useAuth()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const [profile, setProfile] = useState({})

  const toogleModal = () => {
    setModal(old => !old)
  }

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

  if (profile.id === undefined) {
    return (<ProfileCreate add={profile => setProfile(profile)} />)
  }

  return (
    <>
      <Modal show={modal} onClose={toogleModal}>
        <ProfileEdit profile={profile} edit={profile => setProfile(profile)} />
      </Modal>
      <ProfileLinksIndex profileId={profile.id} profileName={profile.name} >
        <GoTo action={() => history.push('/social/' + profile.name)}>
          <CIcon content={cilContact} width={20} />
        </GoTo>
        <ShareButton name={profile.name} />
        <EditButton action={() => toogleModal()} />
      </ProfileLinksIndex>
    </>
  )
}