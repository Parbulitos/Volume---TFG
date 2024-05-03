import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabaseClient } from '@/database/utils';

// import { FaGoogle } from 'react-icons/fa';
// import { FaGithub } from 'react-icons/fa';
// import { FaFacebook } from 'react-icons/fa';
// import { FaLinkedin } from 'react-icons/fa';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    // const [session, setSession] = useState<Session | null>();
    // const router = useRouter();

    // useEffect(() => {
    //     supabaseClient.auth.getSession().then(({ data: { session } }) => {
    //         setSession(session);
    //     });
    //
    //     supabaseClient.auth.onAuthStateChange((_event, session) => {
    //         setSession(session);
    //     });
    // }, []);

    const isEmailValid = (email: string) => {
        const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regexCorreo.test(email);
    };

    const isPasswordValid = (input: string) => {
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+$/;
        return input.length >= 8 && regex.test(input);
    };

    const checkFields = () => {
        const emailValid = isEmailValid(formData.email);
        const passwordValid = isPasswordValid(formData.password);
        return emailValid && passwordValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkFields()) {
            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                alert('Inicio de sesión exitoso');
                //router.push('/');
            } catch (error) {
                alert(error);
            }
        } else {
            alert('Debes rellenar los campos para iniciar sesión');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="left-0 top-0 flex h-full w-1/2 flex-col items-center justify-center p-10">
            <h1 className="text-center text-4xl font-bold text-black">Iniciar sesión</h1>
            {/* Social Icons */}
            {/*}
            <div className='flex justify-center mt-4'>
                
                <a
                    href='#'
                    className='flex w-14 h-14 items-center justify-center border-2 border-black rounded-full p-2 mx-1'
                >
                    <FaGoogle color='black' size={35} />
                </a>
                
                <a
                    href='#'
                    className='flex w-14 h-14 items-center justify-center border-2 border-black rounded-full p-2 mx-1'
                >
                    <FaFacebook color='black' size={35} />
                </a>
                
                <a
                    href='#'
                    className='flex w-14 h-14 items-center justify-center border-2 border-black rounded-full p-2 mx-1'
                >
                    <FaGithub color='black' size={35} />
                </a>
                
                <a
                    href='#'
                    className='flex w-14 h-14 items-center justify-center border-2 border-black rounded-full p-2 mx-1'
                >
                    <FaLinkedin color='black' size={35} />
                </a>
            </div>
    */}
            <span className="mt-4 w-[200px] text-center text-lg text-black md:w-[300px]">
                o usa tu e-mail y contraseña para iniciar sesión
            </span>
            <form className="mt-4 flex min-w-80 flex-col items-center" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="tuemail@ext.com"
                    className="input input-bordered mt-4 w-full max-w-xs border-gray-400 bg-white text-black"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered mt-4 w-full max-w-xs border-gray-400 bg-white text-black"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn btn-secondary btn-wide mt-4 font-bold text-white"
                >
                    Inicia sesión
                </button>
            </form>
            <span className="mt-4 text-center text-black md:hidden">
                ¿No tienes cuenta? <a className="text-secondary">Regístrate</a>
            </span>
        </div>
    );
};

export default SignIn;
