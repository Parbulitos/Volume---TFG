import { supabaseClient } from '@/database/utils';
import { useUsers } from '@/hooks/useUsers';

export const useAuth = () => {
    const signUpNewUser = async (
        email: string,
        password: string,
        name: string,
        username: string
    ) => {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });
        if (!error && data.user != null && data.user.email != null) {
            await useUsers().addUser({
                avatarUrl: null,
                name: name,
                role: null,
                email: data.user.email,
                id: data.user.id,
                username: username,
            });
        }
        if (error) {
            console.error(error);
        }
        return { data, error };
    };
    return {
        signUpNewUser,
    };
};
