import React, { useState } from 'react';
import Image from 'next/image';

import Dropzone from '../../components/dropzone';
import StlView from '../../components/stlView';
import ejeX from '../../public/ejeX.png';
import ejeY from '../../public/ejeY.png';
import ejeZ from '../../public/ejeZ.png';
import PrintOptions from '@/components/printOptions';

const Budget = () => {
    const MATERIALES = ['PLA', 'ABS', 'PETG', 'TPU'];
    const CALIDAD = ['0.4', '0.6', '0.8', '1.0'];
    const POSTPROCESADO = ['Sin', 'Bajo', 'Medio', 'Alto'];

    const [material, setMaterial] = useState<string>('');
    const [calidad, setCalidad] = useState<string>('');
    const [postprocesado, setPostprocesado] = useState<string>('');

    const [models, setModels] = useState<File[]>([]);
    const [modelUrl, setModelUrl] = useState<string>('');
    const [rotation, setRotation] = useState<number[]>([0, 0, 0]);
    const [scale, setScale] = useState<number>(1);

    const handleModels = (droppedModels: File[]) => {
        if (droppedModels.length === 0) return;
        setModelUrl(URL.createObjectURL(droppedModels[0]));
        setModels(droppedModels);
    };

    const handleRotation = (index: number) => {
        const newRotation = [...rotation];
        newRotation[index] += 0.1;
        console.log(newRotation);
        setRotation(newRotation);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Material seleccionado: ${material}`);
        console.log(`Detalle seleccionado: ${calidad}`);
        console.log(`Postprocesado seleccionado: ${postprocesado}`);
    };

    return (
        <div className="mt-[-50px] flex flex-col items-center justify-center lg:flex-row">
            {' '}
            {/*Contenedor de principal*/}
            <div
                className={`transition-all duration-500 ${
                    models.length ? 'lg:w-1/2' : 'lg:w-2/3'
                } mt-[90px] flex flex-col items-center`}
            >
                {' '}
                {/*Contenedor de opciones*/}
                <Dropzone multipleFiles={false} onModelsDrop={handleModels} />
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    {/* Contenedor de materiales */}
                    <h1 className="mt-5 text-center text-3xl font-bold">Material</h1>
                    <PrintOptions options={MATERIALES} onChange={setMaterial} />
                    {/* Contenedor de Calidad */}
                    <h1 className="mt-5 text-center text-3xl font-bold">Calidad</h1>
                    <PrintOptions options={CALIDAD} onChange={setCalidad} />
                    {/* Contenedor de postprocesado */}
                    <h1 className="mt-5 text-center text-3xl font-bold">Postprocesado</h1>
                    <PrintOptions options={POSTPROCESADO} onChange={setPostprocesado} />
                    <button
                        type="submit"
                        className="btn btn-primary btn-wide my-8 h-14 text-2xl font-bold text-white"
                    >
                        Enviar
                    </button>
                </form>
            </div>
            {models.length !== 0 && (
                <div className="flex basis-1/3 flex-col items-center">
                    {' '}
                    {/*Contenedor de presupuesto y ajustes*/}
                    <div className="">
                        <div className="w-full border md:w-[600px]">
                            <StlView
                                fileUrl={modelUrl}
                                rotationX={rotation[0]}
                                rotationY={rotation[1]}
                                rotationZ={rotation[2]}
                                scale={scale}
                            />
                        </div>
                    </div>
                    {/* Contenedor de Rotación */}
                    <div className="mx-auto my-auto max-w-md rounded-lg bg-gray-100 p-4 shadow-md">
                        <p className="mb-4 text-lg font-semibold text-gray-700">Rotar modelo</p>
                        <div className="flex space-x-2">
                            <button
                                className="btn btn-primary px-4 py-2 font-bold text-white"
                                onClick={() => handleRotation(0)}
                            >
                                Eje X
                                <Image src={ejeX} alt="ejeX" width={25} height={25} />
                            </button>
                            <button
                                className="btn btn-primary px-4 py-2 font-bold text-white"
                                onClick={() => handleRotation(1)}
                            >
                                Eje Y
                                <Image src={ejeY} alt="ejeX" width={25} height={25} />
                            </button>
                            <button
                                className="btn btn-primary px-4 py-2 font-bold text-white"
                                onClick={() => handleRotation(2)}
                            >
                                Eje Z
                                <Image src={ejeZ} alt="ejeX" width={25} height={25} />
                            </button>
                        </div>
                    </div>
                    {/* Contenedor de Escala */}
                    <div className="m-auto flex flex-col items-center">
                        <input
                            type="range"
                            min={0.1}
                            max={10.0}
                            value={scale}
                            step={0.1}
                            className="range range-primary range-xs w-[350px] md:w-[450px]"
                            onChange={(e) => setScale(Number(e.target.value))}
                        />
                        <p>Escala {scale}</p>
                    </div>
                    <div className="mx-auto my-auto">Información</div>
                </div>
            )}
        </div>
    );
};

export default Budget;
