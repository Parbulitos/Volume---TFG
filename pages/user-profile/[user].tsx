import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import patito from "../../public/patito.png";
import banner from "../../public/banner.jpg";
import { FaRegEnvelope } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import Catalog from "@/components/catalog";

const UserProfile = () => {
  const [activeStat, setActiveStat] = useState("Diseños");
  const stats = ["Diseños", "Likes", "Impresiones", "Seguidores", "Seguidos"];

  const router = useRouter();
  const { user } = router.query;

  const handleStatClick = (stat: string) => {
    setActiveStat(stat);
    console.log(`${stat} pulsado`); // Acción para el stat pulsado
  };

  // Función para determinar si un stat está activo
  const isActive = (stat: string) =>
    activeStat === stat ? "bg-secondary" : "bg-primary";

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
        <h1 className="font-bold text-white text-3xl">{user}</h1>
      <div className="mx-auto mt-5 max-w-[1000px] min-w-[1000px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-300 rounded-t-lg h-48 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            <Image src={banner} alt="banner"></Image>
          </span>
        </div>
        <div className="absolute transform -translate-y-24 -translate-x-1/2">
          <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-lg text-white font-semibold">
                <Image src={patito} alt="User Avatar"></Image>
            </span>
          </div>
        </div>
        <div className="join absolute transform mt-3 translate-x-[642px]">
          <button className="btn btn-primary text-white w-[120px] join-item">
            Seguir
            <FaUserPlus className="w-6 h-6" />
          </button>
          <button className="btn btn-primary text-white w-[120px] join-item">
            Mensaje
            <FaRegEnvelope className="w-6 h-6" />
          </button>
          <button className="btn btn-primary text-white w-[120px] join-item">
            Propina
            <FaCircleDollarToSlot className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-24">
        <div className="stats shadow">
        {stats.map((stat) => (
            <button className={`stat place-items-center w-[150px] ${isActive(stat)}`} onClick={() => handleStatClick(stat)}>
                <div className="stat-title font-bold text-white">{stat}</div>
                <div className="stat-value text-white">100</div>
            </button>
        ))}
        </div>
        <div className="divider divider-primary w-[1000px]"></div>
      </div>
        <div className=""><Catalog/></div>
    </div>
  );
};

export default UserProfile;
