import React from "react";

import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
         md:w-2/5"
        >
          <span className="text-violet-400">Volume</span>, Tu solución 3D
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-5 mb-12 px-4 md:px-0 md:mx-[200px]">
        <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
          <h6 className="text-xl font-bold mb-1">Servicios</h6>
          <hr className="border-0 h-px bg-gray-300 w-3/4 md:w-[200px] mx-auto mb-2" />
          <p className="mb-4">
            <a className="text-white dark:text-neutral-200">
              Impresión 3D
            </a>
          </p>
          <p className="mb-4">
            <a className="text-white dark:text-neutral-200">
              Monitorización
            </a>
          </p>
          <p className="mb-4">
            <a className="text-white dark:text-neutral-200">
              Escaneado 3D
            </a>
          </p>
          <p>
            <a className="text-white dark:text-neutral-200">Diseño 3D</a>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h6 className="text-xl font-bold mb-1">Enlaces de interés</h6>
          <hr className="border-0 h-px bg-gray-300 w-3/4 md:w-[200px] mx-auto mb-2" />
          <p className="mb-4">
            <a className="text-white dark:text-neutral-200">Tutoriales</a>
          </p>
          <p className="mb-4">
            <a className="text-white dark:text-neutral-200">Catálogo</a>
          </p>
          <p className="mb-4">
            <a className="text-white dark:text-neutral-200">
              Presupuesto
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-center md:items-end lg:items-end">
          <h6 className="text-xl font-bold mb-1">Contacto</h6>
          <hr className="border-0 h-px bg-gray-300 w-3/4 md:w-[200px] mx-auto mb-2" />
          <p className="mb-4">
            <i className="pi pi-phone mr-5"></i>
            <a className="text-white dark:text-neutral-200">
              +34 967 35 64 59
            </a>
          </p>
          <p className="mb-4">
            <i className="pi pi-envelope mr-5"></i>
            <a className="text-white dark:text-neutral-200">
              volume@3d.es
            </a>
          </p>
          <p className="mb-4">
            <i className="pi pi-home mr-5"></i>
            <a className="text-white dark:text-neutral-200">
              C/ Camí de Vera
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-5 mb-12 px-4 md:px-0 lg:mx-[200px] md:justify-between">
        <span className="flex justify-center items-center mb-2 sm:mb-2 md:mb-0 lg:mb-0">© 2024 Appy. All rights reserved.</span>
        <span className="flex justify-center items-center mb-2 sm:mb-2 md:mb-0 lg:mb-0">Terms · Privacy Policy</span>
        <div className="flex flex-row space-x-4 justify-center items-center mb-2 sm:mb-2 md:mb-0 lg:mb-0">
          <button className="btn btn-md bg-violet-400 border-0"><FaInstagram color="white" className="w-[25px] h-[25px] "/></button>
          <button className="btn btn-md bg-violet-400 border-0"><FaGithub color="white" className="w-[25px] h-[25px]"/></button>
          <button className="btn btn-md bg-violet-400 border-0"><FaSquareXTwitter color="white" className="w-[25px] h-[25px]"/></button>
          <button className="btn btn-md bg-violet-400 border-0"><GrLinkedin color="white" className="w-[25px] h-[25px]"/></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
