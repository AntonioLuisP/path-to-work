import { useState, useEffect, createContext } from 'react'
import { supabase } from '../services/supabase'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

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

        return () => {
            authListener.unsubscribe();
        };
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )

}