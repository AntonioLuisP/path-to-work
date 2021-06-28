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

        if (user) {
            history.push('/dashboard')
        } else {
            history.push('/login')
        }

        return () => {
            authListener?.unsubscribe();
        };
    }, [user, history]);

    async function handleLoginUser({ email, password }) {
        const { error } = await supabase.auth.signIn({ email, password })

        if (error) {
            alert('erro: ' + error)
            return;
        }
    }

    async function handleRegisterNewUser({ email, password }) {
        const { user, error } = await supabase.auth.signUp({ email, password })

        if (error) {
            alert('erro: ' + error)
            return;
        } else if (!user && !error) {
            alert('An email has been sent to you for verification!')
            return;
        }
    }

    async function handleLogout() {
        supabase.auth.signOut().catch(console.error);
    };

    return (
        <AuthContext.Provider value={{ user, handleLoginUser, handleRegisterNewUser, handleLogout }}>
            {props.children}
        </AuthContext.Provider>
    )

}