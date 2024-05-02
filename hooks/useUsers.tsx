import {Users} from "@prisma/client";

export const useUsers = () => {

    const getUserById = async (uid: string): Promise<Users> => {
        return (await fetch(`/api/users/getuserbyid?id=${uid}`)).json().then((res) => res.user)
    }

    const getAllUsers = async(): Promise<Users[]> =>{
        return (await fetch(`/api/users/getallusers`)).json().then()
    }

    const addUser = async (user: Users) => {
        return (await fetch(`/api/users/adduser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }))
    }

    return {
        getUserById,
        getAllUsers,
        addUser,
    }
}