import { useState, useEffect, createContext } from 'react'
import { useHistory } from 'react-router'
import { supabase } from '../services/supabase'

export const AuthContext = createContext({})

export function AuthProvider(props) {

    const history = useHistory()

    const [user, setUser] = useState(null)

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );

        // if (user) {
        //     history.push('/dashboard')
        // } else {
        //     history.push('/login')
        // }

        return () => {
            authListener?.unsubscribe();
        };
    }, [user, history]);


    return (
        <AuthContext.Provider value={{ user }}>
            {props.children}
        </AuthContext.Provider>
    )

}