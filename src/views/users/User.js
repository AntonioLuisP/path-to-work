import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const User = () => {

  const { user } = useAuth()

  return (
    <div>
      User scream: {user.id}
    </div>
  )
}

export default User
