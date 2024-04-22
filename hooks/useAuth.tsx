import {createClient} from '@supabase/supabase-js'
import {Users} from "@prisma/client";
import {useUsers} from "@/hooks/useUsers";

export const useAuth = () => {
    const signUpNewUser = async (email: string, password: string) => {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if(!error && data.user != null && data.user.email != null){
            await useUsers().postUser({avatarUrl: null, name: "", role: null, email: data.user.email, id: data.user.id, username: ""})
        }
        if (error) {
            alert(error.message)
        }
    }
    return {
        signUpNewUser
    }
}