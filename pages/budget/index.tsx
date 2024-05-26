import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { IoInformationCircleOutline } from 'react-icons/io5';
import Dropzone from '../../components/dropzone';
import StlView from '../../components/stlView';
import ejeX from '../../public/ejeX.png';
import ejeY from '../../public/ejeY.png';
import ejeZ from '../../public/ejeZ.png';
import PrintOptions from '@/components/printOptions';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useBudget } from '@/hooks/useBudget';

interface ModelInfo {
    volume: number;
    weight: number;
    boundingBox: {
        x: number;
        y: number;
        z: number;
    };
}

const Budget = () => {
    const router = useRouter();
    const MATERIALES = ['PLA', 'ABS', 'PETG', 'TPU'];
    const PRECIOS_POR_GRAMO: Record<string, number> = {
        PLA: 0.02,
        ABS: 0.03,
        PETG: 0.02,
        TPU: 0.05,
    };
    const PRECIOS_CALIDAD: Record<string, number> = {
        '0.2': 2,
        '0.4': 1.5,
        '0.6': 1,
        '0.8': 0.5,
    };
    const PRECIOS_POSTPROCESADO: Record<string, number> = {
        Sin: 0,
        Bajo: 1,
        Medio: 2,
        Alto: 3,
    };
    const CALIDAD = ['0.2', '0.4', '0.6', '0.8'];
    const POSTPROCESADO = ['Sin', 'Bajo', 'Medio', 'Alto'];

    const [material, setMaterial] = useState<string>('');
    const [calidad, setCalidad] = useState<string>('');
    const [postprocesado, setPostprocesado] = useState<string>('');
    const [stlData, setStlData] = useState<ModelInfo>();
    const [initialStlData, setInitialStlData] = useState<ModelInfo>();
    const [price, setPrice] = useState<number>(0);
    const [formInactive, setFormInactive] = useState<boolean>(true);

    const [models, setModels] = useState<File[]>([]);
    const [modelUrl, setModelUrl] = useState<string>('');
    const [rotation, setRotation] = useState<number[]>([0, 0, 0]);
    const [scale, setScale] = useState<number>(1);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const { getBudgetInfo } = useBudget();

    const handleModels = async (droppedModels: File[]) => {
        if (droppedModels.length === 0) return;
        setModelUrl(URL.createObjectURL(droppedModels[0]));
        setModels(droppedModels);
        const response = await getBudgetInfo(droppedModels[0] as File);
        const { volume, weight, boundingBox } = response.stl;
        const boundingBoxObj = {
            x: boundingBox[0],
            y: boundingBox[1],
            z: boundingBox[2],
        };
        
        setStlData({ volume, weight, boundingBox: boundingBoxObj });
        // setStlData({ volume: 100, weight: 220, boundingBox: boundingBoxObj });
        setInitialStlData({ volume, weight, boundingBox: boundingBoxObj });
        calculatePrice({ volume, weight, boundingBox: boundingBoxObj }); // Calcular el precio al soltar un nuevo modelo
        setFormInactive(false);
    };

    const handleRotation = (index: number) => {
        const newRotation = [...rotation];
        newRotation[index] += 0.1;
        setRotation(newRotation);
    };

    const updateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setScale(value);
        if (initialStlData) {
            const factor = value / 1;
            const newStlData: ModelInfo = {
                volume: initialStlData.volume * factor,
                weight: initialStlData.weight * factor,
                boundingBox: {
                    x: initialStlData.boundingBox.x * factor,
                    y: initialStlData.boundingBox.y * factor,
                    z: initialStlData.boundingBox.z * factor,
                },
            };
            setStlData(newStlData);
            calculatePrice(newStlData); // Calcular el precio al cambiar la escala
        }
    };

    const calculatePrice = (modelData?: ModelInfo) => {
        const calidadPrice = PRECIOS_CALIDAD[calidad];
        const postprocesadoPrice = PRECIOS_POSTPROCESADO[postprocesado];
        const materialPrice = PRECIOS_POR_GRAMO[material];
        const weight = modelData?.weight || stlData?.weight || 0;
        console.log(calidadPrice, postprocesadoPrice, materialPrice, weight)
        const totalPrice = materialPrice * weight + calidadPrice + postprocesadoPrice;
        setPrice(Number(totalPrice.toFixed(2)));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        Swal.fire({
            title: '¡Presupuesto enviado!',
            text: 'En breve nos pondremos en contacto contigo',
            icon: 'success',
        });
        router.push('/');
        console.log(`Material seleccionado: ${material}`);
        console.log(`Detalle seleccionado: ${calidad}`);
        console.log(`Postprocesado seleccionado: ${postprocesado}`);
    };

    useEffect(() => {
        calculatePrice(); // Calcular el precio cada vez que cambian material, calidad o postprocesado
    }, [material, calidad, postprocesado]);

    useEffect(() => {
        setIsFormValid(material !== '' && calidad !== '' && postprocesado !== '' && price > 0);
    }, [material, calidad, postprocesado, price]);

    return (
        <div className="mt-[20px] flex flex-col items-center justify-center lg:flex-row lg:items-stretch">
            {' '}
            {/*Contenedor de principal*/}
            <div
                className={`transition-all duration-500 ${
                    models.length ? 'lg:w-1/2' : 'lg:w-2/3'
                } flex flex-col items-center`}
            >
                {' '}
                {/*Contenedor de opciones*/}
                <Dropzone multipleFiles={false} onModelsDrop={handleModels} data-testid="dropzone"/>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <fieldset className='relative' disabled={formInactive}>
                        {/* Contenedor de materiales */}
                        <h1 className="mt-5 text-center text-3xl font-bold">Material</h1>
                        <PrintOptions options={MATERIALES} onChange={setMaterial} />
                        {/* Contenedor de Calidad */}
                        <h1 className="relative mt-5 text-center text-3xl font-bold">
                            Calidad
                            <span
                                className="tooltip tooltip-right tooltip-secondary absolute translate-x-[15px] transform cursor-pointer text-sm text-white"
                                data-tip="Cuanto menor es el número, mayor es la calidad del acabado."
                            >
                                <IoInformationCircleOutline />
                            </span>
                        </h1>
                        <PrintOptions options={CALIDAD} onChange={setCalidad} />
                        {/* Contenedor de postprocesado */}
                        <h1 className="relative mt-5 text-center text-3xl font-bold">
                            Postprocesado{' '}
                            <span
                                className="tooltip tooltip-right tooltip-secondary absolute translate-x-[15px] transform cursor-pointer text-sm text-white"
                                data-tip="El postprocesado son aquellas operaciones que se realizan sobre la pieza impresa para mejorar su acabado"
                            >
                                <IoInformationCircleOutline />
                            </span>
                        </h1>
                        <PrintOptions options={POSTPROCESADO} onChange={setPostprocesado} />
                    </fieldset>
                </form>
                <div className="mb-12 mt-4 flex gap-x-8">
                    <button
                        onClick={handleSubmit}
                        className="btn btn-primary btn-wide h-14 text-2xl font-bold text-white"
                        disabled={!isFormValid}
                    >
                        Enviar
                    </button>
                </div>
            </div>
            {/* Contenedor de modelo */}
            {models.length !== 0 ? (
                !stlData ? (
                    <span className="w- z- loading loading-ring z-[1] my-8 w-20 text-primary"></span>
                ) : (
                    <div className="flex h-full basis-1/3 flex-col items-center">
                        {' '}
                        {/*Contenedor de presupuesto y ajustes*/}
                        <div className="h-[300px] w-full border md:h-[400px] md:w-[600px]">
                            <StlView
                                fileUrl={modelUrl}
                                rotationX={rotation[0]}
                                rotationY={rotation[1]}
                                rotationZ={rotation[2]}
                                scale={scale}
                            />
                        </div>
                        {/* Contenedor de Rotación */}
                        <div className="mx-auto mt-8 max-w-md rounded-lg bg-gray-100 p-4 shadow-md">
                            <p className="text-lg font-semibold text-gray-700">Rotar modelo</p>
                            <div className="flex space-x-2">
                                <button
                                    className="btn btn-primary px-4 font-bold text-white"
                                    onClick={() => handleRotation(0)}
                                >
                                    Eje X
                                    <Image src={ejeX} alt="ejeX" width={25} height={25} />
                                </button>
                                <button
                                    className="btn btn-primary px-4 font-bold text-white"
                                    onClick={() => handleRotation(1)}
                                >
                                    Eje Y
                                    <Image src={ejeY} alt="ejeX" width={25} height={25} />
                                </button>
                                <button
                                    className="btn btn-primary px-4 font-bold text-white"
                                    onClick={() => handleRotation(2)}
                                >
                                    Eje Z
                                    <Image src={ejeZ} alt="ejeX" width={25} height={25} />
                                </button>
                            </div>
                        </div>
                        {/* Contenedor de Escala */}
                        <div className="m-auto mt-8 flex flex-col items-center">
                            <input
                                type="range"
                                min={0.1}
                                max={10.0}
                                value={scale}
                                step={0.1}
                                className="range range-primary range-xs w-[350px] md:w-[450px]"
                                onChange={(e) => updateValues(e)}
                            />
                            <p>Escala {scale}</p>
                        </div>
                        <div className="mt-4 flex flex-col items-center justify-center gap-y-1">
                            <p>Información</p>
                            <br />
                            <div className="flex gap-x-8">
                                <p>Volumen: {stlData?.volume.toFixed(2)} cm3</p>
                                <p>Peso: {stlData?.weight.toFixed(2)} g</p>
                            </div>
                            <p>X: {stlData?.boundingBox.x.toFixed(2)} mm</p>
                            <p>Y: {stlData?.boundingBox.y.toFixed(2)} mm</p>
                            <p>Z: {stlData?.boundingBox.z.toFixed(2)} mm</p>
                        </div>
                        <h2 className="text-3xl" data-testid="price">Precio: {price} €</h2>
                    </div>
                )
            ) : null}
        </div>
    );
};

export default Budget;
