import {Users} from "@prisma/client";

export const useUsers = () => {
    const getUserById = async (uid: number): Promise<Users> => {
        return (await fetch(`/api/users/get/getuserbyid?id=${uid}`)).json().then((res) => res.user)
    }

    const getAllUsers = async(): Promise<Users[]> =>{
        return (await fetch(`/api/users/get/getallusers`)).json().then()
    }

    const postUser = async (user: Users) => {
        return (await fetch(`/api/users/post/adduser`, {
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
        postUser,
    }
}