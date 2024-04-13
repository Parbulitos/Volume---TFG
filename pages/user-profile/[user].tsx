import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import patito from '../../public/patito.png';
import { FaRegEnvelope } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaCircleDollarToSlot } from 'react-icons/fa6';

const UserProfile = () => {
    const [activeStat, setActiveStat] = useState(null);

    const router = useRouter();
    const { user } = router.query;

    const handleStatClick = (stat: any) => {
        setActiveStat(stat);
        console.log(`${stat} pulsado`); // Acción para el stat pulsado
      };

      // Función para determinar si un stat está activo
  const isActive = (stat: any) => activeStat === stat ? 'border-2 border-white' : '';

    return (
        <div className='flex flex-col items-center min-h-screen p-8'>
            <div className='mx-auto mt-5 min-w-[1000px] bg-white shadow-lg rounded-lg overflow-hidden'>
                <div className='bg-blue-300 rounded-t-lg h-48 flex items-center justify-center'>
                    <span className='text-2xl font-bold text-white'>Banner</span>
                </div>
                <div className='absolute transform -translate-y-24 -translate-x-1/2'>
                    <div className='w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg'>
                        <span className='text-lg text-white font-semibold'>Profile Picture</span>
                    </div>
                </div>
                <div className='join absolute transform mt-3 translate-x-[642px]'>
                    <button className='btn btn-primary text-white w-[120px] join-item'>
                        Seguir
                        <FaUserPlus className='w-6 h-6' />
                    </button>
                    <button className='btn btn-primary text-white w-[120px] join-item'>
                        Mensaje
                        <FaRegEnvelope className='w-6 h-6' />
                    </button>
                    <button className='btn btn-primary text-white w-[120px] join-item'>
                        Propina
                        <FaCircleDollarToSlot className='w-6 h-6' />
                    </button>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center mt-24'>
                {/* //TODO: Hacer un input radio para que se coloree cada uno */}
                <div className='stats shadow'>
                    {/* Itera sobre tus stats como un array para simplificar el código */}
      {['Diseños', 'Likes', 'Impresiones', 'Seguidores', 'Seguidos'].map((stat, index) => (
        <button
          key={index}
          className={`stat place-items-center w-[150px] bg-primary ${isActive(stat)}`}
          onClick={() => handleStatClick(stat)}
        >
          <div className='stat-title font-bold text-white'>{stat}</div>
          <div className='stat-value text-white'>{/* El valor correspondiente aquí */}</div>
        </button>
      ))}
                    {/* <button className='stat place-items-center w-[150px] bg-primary'>
                        <div className='stat-title font-bold text-white'>Diseños</div>
                        <div className='stat-value text-white'>28</div>
                    </button>

                    <button className='stat place-items-center w-[150px] bg-primary'>
                        <div className='stat-title font-bold text-white'>Likes</div>
                        <div className='stat-value text-white'>112</div>
                    </button>

                    <button className='stat place-items-center w-[150px] bg-primary'>
                        <div className='stat-title font-bold text-white'>Impresiones</div>
                        <div className='stat-value text-white'>14</div>
                    </button>
                    <button className='stat place-items-center w-[150px] bg-primary'>
                        <div className='stat-title font-bold text-white'>Seguidores</div>
                        <div className='stat-value text-white'>3400</div>
                    </button>
                    <button className='stat place-items-center w-[150px] bg-primary'>
                        <div className='stat-title font-bold text-white'>Seguidos</div>
                        <div className='stat-value text-white'>58</div>
                    </button> */}
                </div>
                <div className="divider divider-primary w-[1000px]"></div>
            </div>
        </div>
    );
};

export default UserProfile;
