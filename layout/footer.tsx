import React from 'react';

import { FaInstagram } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { GrLinkedin } from 'react-icons/gr';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="flex items-center justify-center bg-[#ffffff19] px-4 py-7 sm:px-12 md:justify-between">
                <h1
                    className="mb-6 text-center text-3xl font-semibold md:mb-0 md:w-2/5 md:text-left lg:text-4xl
        lg:leading-normal"
                >
                    <span className="text-violet-400">Volume</span>, Tu solución 3D
                </h1>
            </div>

            <div className="mb-12 mt-5 flex flex-col justify-between px-4 md:flex-row lg:mx-[200px]">
                <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
                    <h6 className="mb-1 text-xl font-bold">Servicios</h6>
                    <hr className="mx-auto mb-2 h-px w-3/4 border-0 bg-gray-300 md:w-[200px]" />
                    <p className="mb-4">
                        <a className="text-white dark:text-neutral-200">Impresión 3D</a>
                    </p>
                    <p className="mb-4">
                        <a className="text-white dark:text-neutral-200">Monitorización</a>
                    </p>
                    <p className="mb-4">
                        <a className="text-white dark:text-neutral-200">Escaneado 3D</a>
                    </p>
                    <p>
                        <a className="text-white dark:text-neutral-200">Diseño 3D</a>
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h6 className="mb-1 text-xl font-bold">Enlaces de interés</h6>
                    <hr className="mx-auto mb-2 h-px w-3/4 border-0 bg-gray-300 md:w-[200px]" />
                    <p className="mb-4">
                        <a className="text-white dark:text-neutral-200">Tutoriales</a>
                    </p>
                    <p className="mb-4">
                        <a className="text-white dark:text-neutral-200">Catálogo</a>
                    </p>
                    <p className="mb-4">
                        <a className="text-white dark:text-neutral-200">Presupuesto</a>
                    </p>
                </div>
                <div className="flex flex-col items-center sm:items-center md:items-end lg:items-end">
                    <h6 className="mb-1 text-xl font-bold">Contacto</h6>
                    <hr className="mx-auto mb-2 h-px w-3/4 border-0 bg-gray-300 md:w-[200px]" />
                    <p className="mb-4">
                        <i className="pi pi-phone mr-5"></i>
                        <a className="text-white dark:text-neutral-200">+34 967 35 64 59</a>
                    </p>
                    <p className="mb-4">
                        <i className="pi pi-envelope mr-5"></i>
                        <a className="text-white dark:text-neutral-200">volume@3d.es</a>
                    </p>
                    <p className="mb-4">
                        <i className="pi pi-home mr-5"></i>
                        <a className="text-white dark:text-neutral-200">C/ Camí de Vera</a>
                    </p>
                </div>
            </div>
            <div className="mb-12 mt-5 flex flex-col justify-between px-4 md:flex-row md:justify-between lg:mx-[200px]">
                <span className="mb-2 flex items-center justify-center sm:mb-2 md:mb-0 lg:mb-0">
                    © 2024 Appy. All rights reserved.
                </span>
                <span className="mb-2 flex items-center justify-center sm:mb-2 md:mb-0 lg:mb-0">
                    Terms · Privacy Policy
                </span>
                <div className="mb-2 flex flex-row items-center justify-center space-x-4 sm:mb-2 md:mb-0 lg:mb-0">
                    <button className="btn btn-md border-0 bg-violet-400 hover:bg-secondary">
                        <FaInstagram color="white" className="h-[25px] w-[25px] " />
                    </button>
                    <button className="btn btn-md border-0 bg-violet-400 hover:bg-secondary">
                        <FaGithub color="white" className="h-[25px] w-[25px]" />
                    </button>
                    <button className="btn btn-md border-0 bg-violet-400 hover:bg-secondary">
                        <FaSquareXTwitter color="white" className="h-[25px] w-[25px]" />
                    </button>
                    <button className="btn btn-md border-0 bg-violet-400 hover:bg-secondary">
                        <GrLinkedin color="white" className="h-[25px] w-[25px]" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
