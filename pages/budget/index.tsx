import React, { useState } from "react";
import Image from "next/image";

import Dropzone from "../../components/dropzone";
import StlView from "../../components/stlView";
import ejeX from "../../public/ejeX.png";
import ejeY from "../../public/ejeY.png";
import ejeZ from "../../public/ejeZ.png";

const Budget = () => {
  const [models, setModels] = useState<File[]>([]);
  const [modelUrl, setModelUrl] = useState<string>('');
  const [rotation, setRotation] = useState<number[]>([0, 0, 0]);
  const [scale, setScale] = useState<number>(1);

  const handleModels = (droppedModels: File[]) => {
    if(droppedModels.length === 0) return;
    setModelUrl(URL.createObjectURL(droppedModels[0]));
    setModels(droppedModels);
  }

  const handleRotation = (index: number) => {
    const newRotation = [...rotation];
    newRotation[index] += 0.1;
    console.log(newRotation);
    setRotation(newRotation);
  }

  return (
    <div className="flex flex-row justify-center"> {/*Contenedor de principal*/}
      <div className={`transition-all duration-500 ${models.length ? "w-1/2" : "w-1/3"} flex flex-col p-4 justify-center items-center`}> {/*Contenedor de opciones*/}
        
        <Dropzone multipleFiles={false} onModelsDrop={handleModels}/>

        <div className="flex flex-col items-center mt-6"> {/*Contenedor de materiales*/}
          <h2 className="text-2xl font-bold text-white my-4">Material</h2>
          <div className="grid grid-cols-2 gap-4 place-content-center">
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">PLA</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">ABS</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">PETG</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">TPU</button>
          </div>
        </div>

        <div className="flex flex-col items-center my-4"> {/*Contenedor de nivel de detalle*/}
          <h2 className="text-2xl font-bold text-white my-4">Nivel de detalle</h2>
          <div className="grid grid-cols-2 gap-4 place-content-center">
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">0.2</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">0.4</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">0.6</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">0.8</button>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4 mb-12"> {/*Contenedor de postprocesado*/}
          <h2 className="text-2xl font-bold text-white my-4">Postprocesado</h2>
          <div className="grid grid-cols-2 gap-4 place-content-center">
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">Sin</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">Bajo</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">Medio</button>
            <button className="btn btn-outline btn-primary btn-wide font-bold text-xl">Alto</button>
          </div>
        </div>

      </div>

      {models.length !== 0 && (
      <div className="flex flex-col basis-1/2 items-center"> {/*Contenedor de presupuesto y ajustes*/}
        <div className="my-4">
            <div className="w-[600px] h-[500px] bg-red-500">
              <StlView fileUrl={modelUrl} rotationX={rotation[0]} rotationY={rotation[1]} rotationZ={rotation[2]} scale={scale} />
            </div>
        </div>

        {/* Contenedor de Rotación */}
        <div className="p-4 max-w-md mx-auto my-auto bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4 text-lg font-semibold text-gray-700">Rotar modelo</p>
          <div className="flex space-x-2">
              <button className="btn btn-primary px-4 py-2 text-white font-bold" onClick={() => handleRotation(0)}>Eje X
                <Image src={ejeX} alt="ejeX" width={25} height={25}/>
              </button>
              <button className="btn btn-primary px-4 py-2 text-white font-bold" onClick={() => handleRotation(1)}>Eje Y
                <Image src={ejeY} alt="ejeX" width={25} height={25}/>
              </button>
              <button className="btn btn-primary px-4 py-2 text-white font-bold" onClick={() => handleRotation(2)}>Eje Z
                <Image src={ejeZ} alt="ejeX" width={25} height={25}/>
              </button>
          </div>
        </div>

        {/* Contenedor de Escala */}
        <div className="mx-auto my-auto flex flex-col items-center">
          <input type="range" 
                 min={0.1} 
                 max={10.00} 
                 value={scale}
                 step={0.1} 
                 className="range range-primary range-xs w-[450px]" 
                 onChange={(e) => setScale(Number(e.target.value))} 
          />
          <p>Escala {scale}</p>
        </div>

        <div className="mx-auto my-auto">Información
        </div>
      </div>)}

    </div>
  );
};

export default Budget;
