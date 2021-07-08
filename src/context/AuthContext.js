import { useState, useEffect, createContext } from 'react'
import { supabase } from '../services/supabase'
import { Loading } from '../reusable'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);
        setLoading(false)
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );

        return () => {
            authListener.unsubscribe();
        };
    }, [user]);

    if (loading) return (<><Loading /></>)

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )

}