import Dropzone from '@/components/dropzone';
import React, { useState } from 'react';
import { useModels } from '@/hooks/useModels';
import { Models } from '@prisma/client';

const UploadFile = () => {
    const [droppedModels, setDroppedModels] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const {addModel, getModelFileById} = useModels()

    const onModelsDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        setDroppedModels(prevFiles => [...prevFiles, ...acceptedFiles]);
        console.log('Archivos aceptados: ', acceptedFiles);
    };

    const upload = ()=>{
        // const file = droppedModels.pop()
        // const model = {
        //     collectionId: null,
        //     description: null,
        //     fileUrl: '',
        //     grade: null,
        //     likes: null,
        //     name: file.name,
        //     ownerId: null,
        //     uploadTime: null,
        //     views: null
        // } as Omit<Models, "id">
        //  addModel(model ,'123',file)
        // Download file
        // getModelFileById('123','testModel.stl')
    }

    const handleRemoveModel = (index: number) => {
        setDroppedModels((prevModels) => {
            const newModels = [...prevModels];
            newModels.splice(index, 1);
            return newModels;
        });
    };

    return (
        <div className='flex flex-col justify-center items-center w-full lg:w-2/3 mx-auto mt-5 mb-10'>
            <Dropzone multipleFiles={true} onModelsDrop={onModelsDrop} />
            <button onClick={()=>{upload()}}>Subir</button>
            {droppedModels.length > 0 && (
                <div className='collapse collapse-arrow bg-base-300 w-[90%] lg:w-[1000px] mt-6'>
                    <input type='checkbox' checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                    <div className='collapse-title text-xl font-medium'>
                        Archivos subidos ({droppedModels.length})
                    </div>
                    <div className='collapse-content'>
                        {droppedModels.map((model, index) => (
                            <div
                                key={index}
                                className='flex items-center justify-between p-4 bg-base-200'
                            >
                                <p>{model.name}</p>
                                <button
                                    className='btn btn-sm btn-error'
                                    onClick={() => handleRemoveModel(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 className='text-white text-3xl font-bold mt-6 font'>Información Requerida</h2>
            <div className='flex flex-col md:grid md:grid-cols-2 items-center md:w-[700px] lg:w-[1000px] mt-3 gap-x-4 lg:gap-x-16 gap-y-5'>
                <input
                    type='text'
                    placeholder='Nombre del modelo'
                    className='input input-bordered bg-white text-black'
                />
                <select className='select select-bordered bg-white text-gray-400 w-full'>
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
                <div className='flex flex-col w-[100%] lg:flex-row justify-between items-center py-2 lg:space-x-4'>
                    <label className='flex lg:flex-row justify-between items-center my-2 w-[90%]'>
                        <span className='label-text'>¿Es monetizable?</span>
                        <input type='checkbox' className='checkbox checkbox-primary' />
                    </label>
                    <label className='flex lg:flex-row justify-between items-center my-2 w-[90%]'>
                        <span className='label-text'>¿Es un remix?</span>
                        <input type='checkbox' className='checkbox checkbox-primary' />
                    </label>
                    <label className='flex lg:flex-row justify-between items-center my-2 w-[90%]'>
                        <span className='label-text'>Publicar como anónimo</span>
                        <input type='checkbox' className='checkbox checkbox-primary' />
                    </label>
                </div>

                <textarea
                    className='textarea bg-white w-full md:col-span-2 text-black'
                    placeholder='Descripción del modelo...'
                ></textarea>
            </div>
        </div>
    );
};

export default UploadFile;
