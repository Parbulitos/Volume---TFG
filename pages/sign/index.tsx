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
        <div className='flex items-center justify-center w-screen min-h-[700px]'>
            <div className='relative'>
                <div
                    className={`absolute flex flex-col items-center justify-center bg-gradient-to-r bg-secondary to-white rounded-3xl w-[450px] h-[600px] transition-transform duration-500 ${
                        isPanelRight ? 'translate-x-[450px]' : 'translate-x-0'
                    }`}
                >
                    <p className='text-2xl font-bold text-center'>{isPanelRight ? <>¡Hey!<br/>Registrate para acceder a todo el contenido</> : '¿Ya tienes cuenta?'}</p>
                    <button className='btn btn-lg btn-secondary border-white shadow-2xl mt-8' onClick={togglePanel} >
                        {isPanelRight ? 'Regístrate' : 'Inicia Sesión'}
                    </button>
                </div>
                <div className='flex justify-between bg-white rounded-3xl w-[900px] h-[600px]'>
                    <SignIn />
                    <SignUp />
                </div>
            </div>
        </div>
    );
};

export default Forms;
