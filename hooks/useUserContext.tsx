import { supabaseClient } from '@/database/utils';
import { Session, User } from '@supabase/supabase-js';
import { useContext, useState, useEffect, createContext } from 'react';
import { useUsers } from './useUsers';  // Asegúrate de que este hook devuelve un método para obtener detalles del usuario por ID
import { Users } from '@prisma/client';
import router from 'next/router';

// Contexto para la autenticación
const AuthContext = createContext<{
    session: Session | null | undefined,
    user: User | null | undefined,
    userDetails: Users | null,
    signOut: () => void
}>({ session: null, user: null, userDetails: null, signOut: () => {} });

export const UserContext = ({ children }: any) => {
    const [user, setUser] = useState<User | null>();
    const [userDetails, setUserDetails] = useState<Users | null>(null); // Estado para los detalles del usuario
    const [session, setSession] = useState<Session | null>();
    const [loading, setLoading] = useState(true);
    const { getUserById } = useUsers(); // Asume que este hook devuelve una función que obtiene los detalles del usuario por su ID

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await supabaseClient.auth.getSession();
            if (error) throw error;
            setSession(session);
            setUser(session?.user);
            if (session?.user) {
                const details = await getUserById(session.user.id);
                setUserDetails(details); // Asignar detalles obtenidos al estado
            }
            setLoading(false);
        };

        const { data: listener } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user);
            if (session?.user) {
                const details = await getUserById(session.user.id);
                setUserDetails(details); // Asignar detalles obtenidos al estado
            } else {
                setUserDetails(null); // Limpiar detalles si no hay sesión
            }
            setLoading(false);
        });

        setData();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const value = {
        session,
        user,
        userDetails,
        signOut: () => {
            router.push('/');
            supabaseClient.auth.signOut();
            setUserDetails(null); // Limpiar detalles al cerrar sesión
        },
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(AuthContext);
};
