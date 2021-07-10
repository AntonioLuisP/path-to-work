import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import PasswordEdit from './PasswordEdit'

const UserEdit = () => {

    const { authUser } = useAuth()

    return (
        <div>
            User scream: {authUser.id}
            <PasswordEdit />
        </div>
    )
}

export default UserEdit
