import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import patito from '../../public/patito.png';
import banner from '../../public/banner.jpg';
import { FaRegEnvelope } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import Catalog from '@/components/catalog';

const UserProfile = () => {
    const [activeStat, setActiveStat] = useState('Diseños');
    const stats = ['Diseños', 'Likes', 'Impresiones', 'Seguidores', 'Seguidos'];

    const router = useRouter();
    const { user } = router.query;

    const handleStatClick = (stat: string) => {
        setActiveStat(stat);
        console.log(`${stat} pulsado`); // Acción para el stat pulsado
    };

    // Función para determinar si un stat está activo
    const isActive = (stat: string) => (activeStat === stat ? 'bg-secondary' : 'bg-primary');

    return (
        <div className='flex flex-col items-center min-h-screen p-4'>
            <h1 className='font-bold text-white text-3xl sm:text-2xl md:text-3xl'>{user}</h1>
            <div className='mx-auto mt-5 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-[1250px] shadow-lg rounded-lg overflow-hidden'>
                <div className='rounded-t-lg h-60 hidden lg:inline-block'>
                    <Image src={banner} alt='banner' className='-translate-y-20'></Image>
                </div>
                <div className='transform lg:absolute lg:-translate-y-24 lg:-translate-x-1/3'>
                    <div className='w-44 h-w-44 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg'>
                        <Image src={patito} alt='User Avatar'></Image>
                    </div>
                </div>
                <div className='join flex flex-row justify-center absolute mt-11 w-full left-0 right-0 sm:justify-center xl:absolute xl:left-1/2 xl:-translate-x-1/2 xl:mt-11'>
                    <button className='join-item btn btn-primary text-white w-24 md:w-[120px]'>
                        <span className='hidden md:block'>Seguir</span>
                        <FaUserPlus className='w-6 h-6' />
                    </button>
                    <button className='join-item btn btn-primary text-white w-24 md:w-[120px]'>
                        <span className='hidden md:block'>Mensaje</span>
                        <FaRegEnvelope className='w-6 h-6' />
                    </button>
                    <button className='join-item btn btn-primary text-white w-24 md:w-[120px]'>
                        <span className='hidden md:block'>Propina</span>
                        <FaCircleDollarToSlot className='w-6 h-6' />
                    </button>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center mt-32'>
                {/* Dropdown solo visible en pantallas pequeñas */}
                <div className='dropdown dropdown-bottom sm:block md:hidden'>
                    <div tabIndex={0} role='button' className='btn m-1'>
                        Stats
                    </div>
                    <ul
                        tabIndex={0}
                        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                    >
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
                <div className='stats shadow hidden md:block'>
                    {stats.map((stat, index) => (
                        <button
                            key={index}
                            className={`stat place-items-center w-full sm:w-[120px] md:w-[150px] ${isActive(
                                stat
                            )}`}
                            onClick={() => handleStatClick(stat)}
                        >
                            <div className='stat-title font-bold text-white'>{stat}</div>
                            <div className='stat-value text-white'>100</div>
                        </button>
                    ))}
                </div>
                <div className='divider divider-primary w-full md:w-[1250px]'></div>
            </div>
            <div className='w-full'>
                <Catalog />
            </div>
        </div>
    );
};

export default UserProfile;
