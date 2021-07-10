import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import PasswordEdit from './PasswordEdit'

const UserEdit = () => {

    const { user } = useAuth()

    return (
        <div>
            User scream: {user.id}
            <PasswordEdit />
        </div>
    )
}

export default UserEdit
