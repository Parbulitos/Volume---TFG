import {createClient} from "@/database/utils"
import {useUsers} from "@/hooks/useUsers";


export const useAuth = () => {
    const signUpNewUser = async (email: string, password: string) => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        console.log(data)
        if(!error && data.user != null && data.user.email != null){
            await useUsers().addUser({avatarUrl: null, name: "", role: null, email: data.user.email, id: data.user.id, username: ""})
        }
        if (error) {
            console.log(error)
        }
    }
    return {
        signUpNewUser
    }
}