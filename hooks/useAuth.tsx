import { supabaseClient } from '@/database/utils';
import { useUsers } from '@/hooks/useUsers';
import { useImageKit } from '@/hooks/useImageKit';

export const useAuth = () => {
    const signUpNewUser = async (
        email: string,
        password: string,
        name: string,
        username: string,
        avatarImage: File
    ) => {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });
        const avatarUrl = await useImageKit().uploadAvatar(avatarImage);
        if (!error && data.user != null && data.user.email != null) {
            await useUsers().addUser({
                avatarUrl: avatarUrl,
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
