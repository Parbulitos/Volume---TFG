import React from 'react';

// import { FaGoogle } from 'react-icons/fa';
// import { FaGithub } from 'react-icons/fa';
// import { FaFacebook } from 'react-icons/fa';
// import { FaLinkedin } from 'react-icons/fa';

interface SignUpProps {
    onFormChange?: (change: boolean) => void; // eslint-disable-line no-unused-vars
}

const SignUp = ({ onFormChange }: SignUpProps) => {
    return (
        <div className="left-0 top-0 flex h-full w-1/2 flex-col items-center justify-center p-10">
            <h1 className="text-center text-4xl font-bold text-black">Crear Cuenta</h1>
            {/* Social Icons */}
            {/*
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
                o usa tu e-mail para registrarte
            </span>
            <form className="mt-4 flex min-w-80 flex-col items-center">
                <input
                    type="text"
                    placeholder="Nombre"
                    className="input input-bordered mt-4 w-full max-w-xs border-gray-400 bg-white text-black"
                />
                <input
                    type="email"
                    placeholder="tuemail@ext.com"
                    className="input input-bordered mt-4 w-full max-w-xs border-gray-400 bg-white text-black"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered mt-4 w-full max-w-xs border-gray-400 bg-white text-black"
                />
                <button className="btn btn-secondary mt-4 font-bold text-white">Regístrate</button>
            </form>
            <span className="mt-4 text-center text-black md:hidden">
                ¿Ya tienes cuenta?{' '}
                <a
                    className="cursor-pointer text-secondary"
                    onClick={() => onFormChange && onFormChange(false)}
                >
                    Inicia Sesión
                </a>
            </span>
        </div>
    );
};

export default SignUp;
