import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import patito from '../../public/patito.png';
import banner from '../../public/banner.jpg';
import { FaRegEnvelope } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import Catalog from '@/components/catalog';
import { useUserContext } from '@/hooks/useUserContext';
import { useUsers } from '@/hooks/useUsers';
import { Users } from '@prisma/client';
import { useFetchUserData } from '@/hooks/useFetchUserData';

const UserProfile = () => {
    const [activeStat, setActiveStat] = useState('Diseños');
    const stats = ['Diseños', 'Likes', 'Impresiones', 'Seguidores', 'Seguidos'];

    const userData = useFetchUserData();
    // const [userData, setUserData] = useState<Users>()

    // const {getUserById} = useUsers();
    // const { user, session, signOut } = useUserContext()

    // const handleUserData = async ()=>{
    //     const userAux: Users = await getUserById(user?.id || '')
    //     setUserData(userAux)
    //     console.log(user)
    // }

    const router = useRouter();
    // const { user } = router.query;

    const handleStatClick = (stat: string) => {
        setActiveStat(stat);
        console.log(`${stat} pulsado`); // Acción para el stat pulsado
    };

    // Función para determinar si un stat está activo
    const isActive = (stat: string) =>
        activeStat === stat ? 'bg-violet-800' : 'bg-primary hover:bg-secondary';

    // useEffect(() => {
    //     handleUserData()
    // }, []);

    return (
        <div className="flex min-h-screen flex-col items-center p-4">
            <h1 className="text-3xl font-bold text-white sm:text-2xl md:text-3xl">
                {userData?.name}
            </h1>
            <div className="mx-auto mt-5 max-w-full overflow-hidden rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-[1250px]">
                <div className="hidden h-60 rounded-t-lg lg:inline-block">
                    <Image src={banner} alt="banner" className="-translate-y-20"></Image>
                </div>
                <div className="transform lg:absolute lg:-translate-x-1/3 lg:-translate-y-24">
                    <div className="h-w-44 flex w-44 items-center justify-center rounded-full border-4 border-white bg-yellow-300 shadow-lg">
                        <Image src={patito} alt="User Avatar"></Image>
                    </div>
                </div>
                <div className="join absolute left-0 right-0 mt-11 flex w-full flex-row justify-center sm:justify-center xl:absolute xl:left-1/2 xl:mt-11 xl:-translate-x-1/2">
                    <button className="btn btn-primary join-item w-24 text-white md:w-[120px]">
                        <span className="hidden md:block">Seguir</span>
                        <FaUserPlus className="h-6 w-6" />
                    </button>
                    <button className="btn btn-primary join-item w-24 text-white md:w-[120px]">
                        <span className="hidden md:block">Mensaje</span>
                        <FaRegEnvelope className="h-6 w-6" />
                    </button>
                    <button className="btn btn-primary join-item w-24 text-white md:w-[120px]">
                        <span className="hidden md:block">Propina</span>
                        <FaCircleDollarToSlot className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div className="mt-32 flex flex-col items-center justify-center">
                {/* Dropdown solo visible en pantallas pequeñas */}
                <div className="dropdown dropdown-bottom flex flex-col items-center sm:block md:hidden">
                    <div tabIndex={0} role="button" className="btn m-1">
                        {activeStat}
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        {stats.map((stat, index) => (
                            <li key={index} onClick={() => handleStatClick(stat)}>
                                <a>{stat}</a>
                            </li>
                        ))}
                    </ul>
                    {/* //TODO: Poner aquí el número de cosas que toque según qué se pulse */}
                    <h2>Poner datos</h2>
                </div>

                <div className="stats hidden shadow md:block">
                    {stats.map((stat, index) => (
                        <button
                            key={index}
                            className={`hover: stat w-full place-items-center transition duration-200  sm:w-[120px] md:w-[150px] ${isActive(
                                stat
                            )}`}
                            onClick={() => handleStatClick(stat)}
                        >
                            <div className="stat-title font-bold text-white">{stat}</div>
                            <div className="stat-value text-white">100</div>
                        </button>
                    ))}
                </div>
                <div className="divider divider-primary w-full md:w-[1250px]"></div>
            </div>
            <div className="w-full">
                <Catalog />
            </div>
        </div>
    );
};

export default UserProfile;
