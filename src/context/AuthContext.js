import { useState, useEffect, createContext } from 'react'
import { supabase } from '../services/supabase'
import { Loading } from '../reusable'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const session = supabase.auth.session();
        setAuthUser(session?.user ?? null);
        setLoading(false)
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setAuthUser(currentUser ?? null);
            }
        );

        return () => {
            authListener.unsubscribe();
        };
    }, [authUser]);

    if (loading) return (<><Loading /></>)

    return (
        <AuthContext.Provider value={{ authUser }}>
            {children}
        </AuthContext.Provider>
    )

}