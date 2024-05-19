import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logo from '../public/Logo.png';
import avatar from '../public/avatar.svg';
import { useUserContext } from '@/hooks/useUserContext';
import { useRouter } from 'next/router';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { userDetails, signOut } = useUserContext();

    return (
        <header className="flex items-center justify-between bg-gray-900 px-10 py-4 text-white">
            <Link href="/">
                <Image src={logo} alt="logo" width={40} height={40} />
            </Link>
            <nav className="hidden md:flex md:items-center">
                <ul className="flex">
                    <li className="px-5 lg:px-10">
                        <Link
                            href="/catalog"
                            className="transition duration-300 ease-in-out hover:text-violet-400 lg:text-2xl"
                        >
                            Catálogo
                        </Link>
                    </li>
                    <li className="px-5 lg:px-10">
                        <Link
                            href="/budget"
                            className="transition duration-300 ease-in-out hover:text-violet-400 lg:text-2xl"
                        >
                            Presupuesto
                        </Link>
                    </li>
                    <li className="px-5 lg:px-10">
                        <Link
                            href="/tutorials"
                            className="transition duration-300 ease-in-out hover:text-violet-400 lg:text-2xl"
                        >
                            Tutoriales
                        </Link>
                    </li>
                    <li className="px-5 lg:px-10">
                        <Link
                            href="/upload-file"
                            className="transition duration-300 ease-in-out hover:text-violet-400 lg:text-2xl"
                        >
                            Subir Archivo
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
                {userDetails ? (
                    <div className="flex gap-4">
                        <Link
                            href={`/user-profile/${encodeURIComponent(userDetails?.username || '')}`}
                            className="hidden md:block"
                        >
                            <div className="avatar">
                                <div className="w-12 rounded-full bg-white">
                                    <Image src={userDetails.avatarUrl || ''} width={48} height={48} alt="Avatar" />
                                </div>
                            </div>
                        </Link>
                        <button
                            onClick={() => {
                                signOut();
                            }}
                            className="btn btn-primary rounded-full"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <button
                        className="btn btn-primary hidden text-white md:block"
                        onClick={async () => {
                            await router.push('/sign');
                        }}
                    >
                        Iniciar Sesión
                    </button>
                )}
            </div>
            <p className="cursor-pointer md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                Menu
            </p>

            {/* Overlay para móvil */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-10 bg-gray-900">
                    <div
                        className="absolute right-10 top-5 text-4xl"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        &times;
                    </div>
                    <div className="flex h-full flex-col items-center justify-center space-y-6">
                        <Link
                            href={`/user-profile/${encodeURIComponent(userDetails?.username || '')}`}
                            className="text-xl transition duration-300 ease-in-out hover:text-violet-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cuenta
                        </Link>
                        <Link
                            href="/catalog"
                            className="text-xl transition duration-300 ease-in-out hover:text-violet-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Catálogo
                        </Link>
                        <Link
                            href="/budget"
                            className="text-xl transition duration-300 ease-in-out hover:text-violet-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Presupuesto
                        </Link>
                        <Link
                            href="/tutorials"
                            className="text-xl transition duration-300 ease-in-out hover:text-violet-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tutoriales
                        </Link>
                        <Link
                            href="/upload-file"
                            className="text-xl transition duration-300 ease-in-out hover:text-violet-400"
                            onClick={() => setIsMenuOpen(false)}
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
