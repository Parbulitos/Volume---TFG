import SignIn from '@/components/signIn';
import SignUp from '@/components/singUp';
import React, { useState } from 'react';

const Forms = () => {
    // Estado para manejar si el panel está deslizado o no
    const [isPanelRight, setIsPanelRight] = useState(false);

    const togglePanel = () => {
        setIsPanelRight(!isPanelRight); // Cambia el estado actual del panel
    };

    return (
        <>
            <div className='hidden md:flex items-center justify-center w-screen min-h-[700px]'>
                <div className='relative'>
                    <div
                        className={`hidden md:flex absolute flex-col items-center justify-center bg-gradient-to-r bg-secondary to-white rounded-3xl md:w-[350px] lg:w-[450px] h-[600px] transition-transform duration-500 ${
                            isPanelRight
                                ? 'md:translate-x-[350px] lg:translate-x-[450px]'
                                : 'translate-x-0'
                        }`}
                    >
                        <p className='md:text-xl lg:text-2xl font-bold text-center'>
                            {isPanelRight ? (
                                <>
                                    ¡Hey!
                                    <br />
                                    Registrate para acceder a todo el contenido
                                </>
                            ) : (
                                '¿Ya tienes cuenta?'
                            )}
                        </p>
                        <button
                            className='btn btn-lg btn-secondary border-white shadow-2xl mt-8'
                            onClick={togglePanel}
                        >
                            {isPanelRight ? 'Regístrate' : 'Inicia Sesión'}
                        </button>
                    </div>
                    <div className='hidden md:flex justify-between bg-white rounded-3xl md:w-[700px] lg:w-[900px] h-[600px]'>
                        <SignIn />
                        <SignUp />
                    </div>
                </div>
            </div>
            <div className='md:hidden bg-white rounded-3xl flex mx-6 mb-6 justify-center cursor-pointer'>
                {isPanelRight ? (<SignIn onFormChange={togglePanel}/>) : (<SignUp onFormChange={togglePanel}/>)}
                
            </div>
        </>
    );
};

export default Forms;
