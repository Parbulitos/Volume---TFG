import Dropzone from '@/components/dropzone';
import React, { useState } from 'react';

const UploadFile = () => {
    const [droppedModels, setDroppedModels] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const onModelsDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        setDroppedModels(acceptedFiles);
        console.log('Archivos aceptados: ', acceptedFiles);
    };

    const handleRemoveModel = (index: number) => {
        setDroppedModels((prevModels) => {
            const newModels = [...prevModels];
            newModels.splice(index, 1);
            return newModels;
        });
    };

    return (
        <div className='flex flex-col items-center mt-5 mb-10 w-full'>
            <Dropzone
                multipleFiles={true}
                onModelsDrop={onModelsDrop}
                size={{ width: 1000, height: 200 }}
            />

            {droppedModels.length > 0 && 
            <div className='collapse collapse-arrow bg-base-300 w-[1000px] mt-6'>
                <input type='checkbox' checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                <div className='collapse-title text-xl font-medium'>
                    Archivos subidos ({droppedModels.length})
                </div>
                <div className='collapse-content'>
                    {droppedModels.map((model, index) => (
                        <div key={index} className='flex items-center justify-between p-4 bg-base-200'>
                            <p>{model.name}</p>
                            <button className='btn btn-sm btn-error' onClick={() => handleRemoveModel(index)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            </div>}

            <h2 className='text-white text-3xl font-bold mt-6 font'>Información Requerida</h2>
            <div className='grid grid-cols-2 items-center w-[1000px] mt-3 gap-x-16 gap-y-5'>
                <input
                    type='text'
                    placeholder='Nombre del modelo'
                    className='input input-bordered bg-white text-black'
                />
                <select className='select select-bordered bg-white text-gray-400'>
                    <option defaultValue={''}>Categoría</option>
                    <option>Cat 1</option>
                    <option>Cat 2</option>
                    <option>Cat 3</option>
                    <option>Cat 4</option>
                    <option>Cat 5</option>
                </select>
                <input
                    type='text'
                    placeholder='Tags'
                    className='input input-bordered bg-white text-black'
                />
                <div className='flex justify-between'>
                    <label className='flex cursor-pointer items-center gap-2'>
                        <span className='label-text'>¿Es monetizable?</span>
                        <input type='checkbox' className='checkbox checkbox-primary' />
                    </label>
                    <label className='flex cursor-pointer items-center gap-2'>
                        <span className='label-text'>¿Es un remix?</span>
                        <input type='checkbox' className='checkbox checkbox-primary' />
                    </label>
                    <label className='flex cursor-pointer items-center gap-2'>
                        <span className='label-text'>Publicar como anónimo</span>
                        <input type='checkbox' className='checkbox checkbox-primary' />
                    </label>
                </div>
                <textarea
                    className='textarea bg-white col-span-2 text-black'
                    placeholder='Descripción del modelo...'
                ></textarea>
            </div>
        </div>
    );
};

export default UploadFile;
