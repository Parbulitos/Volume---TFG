import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logo from '../public/Logo.png';
import avatar from '../public/avatar.svg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const username = 'testUser';

    return (
        <header className='flex justify-between items-center py-4 px-10 bg-gray-900 text-white'>
            <Link href='/'>
                <Image src={logo} alt='logo' width={40} height={40} />
            </Link>
            <nav className='hidden md:flex md:items-center'>
                <ul className='flex'>
                    <li className='px-5 lg:px-10'>
                        <Link
                            href='/catalog'
                            className='transition duration-300 ease-in-out hover:text-violet-400 lg:text-2xl'
                        >
                            Catálogo
                        </Link>
                    </li>
                    <li className='px-5 lg:px-10'>
                        <Link
                            href='/budget'
                            className='transition duration-300 ease-in-out hover:text-violet-400 lg:text-2xl'
                        >
                            Presupuesto
                        </Link>
                    </li>
                    <li className='px-5 lg:px-10'>
                        <a
                            href='#'
                            className='transition duration-300 ease-in-out hover:text-violet-400 lg:text-2xl'
                        >
                            Tutoriales
                        </a>
                    </li>
                    <li className='px-5 lg:px-10'>
                        <Link
                            href='/upload-file'
                            className='transition duration-300 ease-in-out hover:text-violet-400 lg:text-2xl'
                        >
                            Subir Archivo
                        </Link>
                    </li>
                </ul>
            </nav>
            <Link href={`/user-profile/${encodeURIComponent(username)}`} className='hidden md:block'>
                <div className='avatar'>
                    <div className='w-12 rounded-full bg-white'>
                        <Image src={avatar} alt='Avatar' />
                    </div>
                </div>
            </Link>
            <p className='md:hidden cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                Menu
            </p>

            {/* Overlay para móvil */}
            {isMenuOpen && (
                <div className='fixed inset-0 bg-gray-900 z-10'>
                    <div
                        className='absolute top-5 right-10 text-4xl'
                        onClick={() => setIsMenuOpen(false)}
                    >
                        &times;
                    </div>
                    <div className='flex flex-col items-center justify-center h-full space-y-6'>
                        <Link
                            href={`/user-profile/${encodeURIComponent(username)}`}
                            className='text-xl transition duration-300 ease-in-out hover:text-violet-400'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cuenta
                        </Link>
                        <Link
                            href='/catalog'
                            className='text-xl transition duration-300 ease-in-out hover:text-violet-400'
                        >
                            Catálogo
                        </Link>
                        <Link
                            href='/budget'
                            className='text-xl transition duration-300 ease-in-out hover:text-violet-400'
                        >
                            Presupuesto
                        </Link>
                        <Link
                            href='#'
                            className='text-xl transition duration-300 ease-in-out hover:text-violet-400'
                        >
                            Tutoriales
                        </Link>
                        <Link
                            href='/upload-file'
                            className='text-xl transition duration-300 ease-in-out hover:text-violet-400'
                        >
                            Subir Archivo
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;