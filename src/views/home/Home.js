import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom'



export default function Home() {

    const history = useHistory()

    const { user, signIWithGoogle } = useAuth()


    async function handleCreateRoom() {
        if (!user) {
            await signIWithGoogle()
        }
        history.push('/dashboard/')
    }
    return (
        <>

            <button className='create-room'
                onClick={handleCreateRoom}
            >
                Crie sua sala
            </button>
            <br />
            {/* user: {user} */}
        </>
    )
}