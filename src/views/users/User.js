import React, { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../../hooks/useAuth'
import PasswordEdit from './PasswordEdit'
import { supabase } from '../../services/supabase'
import { Loading } from '../../reusable/'

const User = () => {

  const { user } = useAuth()

  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    const { data: userSearch, error } = await supabase
      .from("users")
      .select("*")
      .eq('user_id', user.id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      console.log(userSearch)
    }
  }, [user.id])

  useEffect(() => {
    fetchUser()
    setLoading(false)
  }, [fetchUser])

  if (loading) return (<Loading />)

  return (
    <div>
      User scream: {user.id}
      <PasswordEdit />
    </div>
  )
}

export default User
