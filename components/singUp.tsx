import React from 'react';

import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const SignUp = () => {
    return (
        <div className='top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center p-10'>
            <h1 className='text-4xl font-bold text-black'>Crear Cuenta</h1>
            {/* Social Icons */}
            <div className='flex justify-center mt-4'>
                {/* Google */}
                <a href='#' className='flex w-14 h-14 items-center justify-center border-2 border-black rounded-full p-2 mx-1'>
                    <FaGoogle color='black' size={35} />
                </a>
                {/* Facebook */}
                <a href='#' className='flex w-14 h-14 items-center justify-center border-2 border-black rounded-full p-2 mx-1'>
                    <FaFacebook color='black' size={35} />
                </a>
                {/* GitHub */}
                <a href='#' className='flex w-14 h-14 items-center justify-center border-2 border-black rounded-full p-2 mx-1'>
                    <FaGithub color='black' size={35} />
                </a>
                {/* LinkedIn */}
                <a href='#' className='flex w-14 h-14 items-center justify-center border-2 border-black rounded-full p-2 mx-1'>
                    <FaLinkedin color='black' size={35} />
                </a>
            </div>
            <span className='text-center text-lg mt-4 text-black'>o usa tu e-mail para registrarte</span>
            <form className='flex flex-col items-center mt-4 min-w-80'>
                <input type="text" placeholder='Nombre' className="input input-bordered w-full max-w-xs border-gray-400 bg-white text-black mt-4" />
                <input type="email" placeholder='tuemail@ext.com' className="input input-bordered w-full max-w-xs border-gray-400 bg-white text-black mt-4" />
                <input type="password" placeholder='Password' className="input input-bordered w-full max-w-xs border-gray-400 bg-white text-black mt-4" />
                <button className='btn btn-secondary mt-4 text-white font-bold'>
                        Regístrate
                    </button>
            </form>
        </div>
    );
};

export default SignUp;
