import SignIn from '@/components/signIn';
import SignUp from '@/components/singUp';
import { useUserContext } from '@/hooks/useUserContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Forms = () => {
    // Estado para manejar si el panel está deslizado o no
    const [isPanelRight, setIsPanelRight] = useState(true);
    const { user } = useUserContext();
    const router = useRouter();

    const togglePanel = () => {
        setIsPanelRight(!isPanelRight); // Cambia el estado actual del panel
    };

    useEffect(() => {
        if (user) router.push('/'); // Redirigir al usuario si ya está logueado
    }, [user, router]);

    return (
        <>
            <div className="hidden min-h-[700px] w-screen items-center justify-center md:flex">
                <div className="relative">
                    <div
                        className={`absolute z-[2] hidden h-[600px] flex-col items-center justify-center rounded-3xl bg-secondary bg-gradient-to-br from-violet-700 to-violet-900 transition-transform duration-500 md:flex md:w-[350px] lg:w-[450px] ${
                            isPanelRight
                                ? 'md:translate-x-[350px] lg:translate-x-[450px]'
                                : 'translate-x-0'
                        }`}
                    >
                        {isPanelRight ? (
                            <p className="mb-[200px] min-h-[100px] text-center font-bold md:text-xl lg:text-2xl">
                                ¡Hey!
                                <br />
                                Registrate para acceder a todo el contenido
                            </p>
                        ) : (
                            <p className="mb-[125px] min-h-[100px] text-center font-bold md:text-xl lg:text-2xl">
                                ¿Ya tienes cuenta?
                            </p>
                        )}

                        <button
                            className="btn btn-secondary btn-lg fixed min-w-48 shadow-2xl"
                            onClick={togglePanel}
                        >
                            {isPanelRight ? 'Regístrate' : 'Inicia Sesión'}
                        </button>
                    </div>
                    <div className="hidden h-[600px] justify-between rounded-3xl bg-white md:flex md:w-[700px] lg:w-[900px]">
                        <SignIn />
                        <SignUp />
                    </div>
                </div>
            </div>
            <div className="mx-6 mb-6 flex cursor-pointer justify-center rounded-3xl bg-white md:hidden">
                {isPanelRight ? <SignIn /> : <SignUp />}
            </div>
        </>
    );
};

export default Forms;
