import { useState, useEffect } from 'react';
import { useUserContext } from './useUserContext';
import { useUsers } from './useUsers';
import { Users } from '@prisma/client';


export const useFetchUserData = () => {
    const [userData, setUserData] = useState<Users | undefined>(undefined);
    const { getUserById } = useUsers();
    const { user } = useUserContext();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.id) {
                const userAux: Users = await getUserById(user.id);
                setUserData(userAux);
            }
        };

        fetchUserData();
    }, [user?.id, getUserById]); // Dependencias para re-ejecutar este efecto

    return userData;
};
