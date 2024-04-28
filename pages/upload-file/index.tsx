import Dropzone from '@/components/dropzone';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const UploadFile = () => {
    const [droppedModels, setDroppedModels] = useState<File[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [images, setImages] = useState<File[]>([]);
    const imageInputRef = useRef(null);

    const onModelsDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        setDroppedModels((prevFiles) => [...prevFiles, ...acceptedFiles]);
        console.log('Archivos aceptados: ', acceptedFiles);
    };

    const handleRemoveModel = (index: number) => {
        setDroppedModels((prevModels) => {
            const newModels = [...prevModels];
            newModels.splice(index, 1);
            return newModels;
        });
    };

    const getImages = (event: any) => {
        const images = event.target.files;
        if (images.length === 0) return;
        setImages((prevImages) => [...prevImages, ...images]);
        event.target.value = null;
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    }

    return (
        <div className="flex flex-col justify-center items-center w-full lg:w-2/3 mx-auto mt-5 mb-10">
            <Dropzone multipleFiles={true} onModelsDrop={onModelsDrop} />

            {droppedModels.length > 0 && (
                <div className="collapse collapse-arrow bg-base-300 w-[90%] lg:w-[1000px] mt-6">
                    <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                    <div className="collapse-title text-xl font-medium">
                        Archivos subidos ({droppedModels.length})
                    </div>
                    <div className="collapse-content">
                        {droppedModels.map((model, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-base-200"
                            >
                                <p>{model.name}</p>
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => handleRemoveModel(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-white text-3xl font-bold mt-6 font">Información Requerida</h2>
            <div className="flex flex-col md:grid md:grid-cols-2 items-center md:w-[700px] lg:w-[1000px] mt-3 gap-x-4 lg:gap-x-16 gap-y-5">
                <input
                    type="text"
                    placeholder="Nombre del modelo"
                    className="input input-bordered bg-white text-black w-full"
                />
                <select className="select select-bordered bg-white text-gray-400 w-full">
                    <option defaultValue={''}>Categoría</option>
                    <option>Cat 1</option>
                    <option>Cat 2</option>
                    <option>Cat 3</option>
                    <option>Cat 4</option>
                    <option>Cat 5</option>
                </select>
                <input
                    type="text"
                    placeholder="Tags"
                    className="input input-bordered bg-white text-black w-full"
                />

                <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/gif"
                    className="file-input file-input-bordered w-full bg-white text-black"
                    onChange={getImages}
                    ref={imageInputRef}
                />

                {images.length === 1 ? (
                    <p>{images.length} imágen seleccionada</p>
                ) : (<p>{images.length} imágenes seleccionadas</p>)}
                {images.length > 0 && (
                    <div className="flex flex-col w-full md:col-span-2 md:flex-row justify-between items-center py-2">
                        <div className="flex gap-x-4 relative">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className="relative w-20 h-20 rounded-lg overflow-hidden"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        className="w-full h-full object-cover"
                                        width={80}
                                        height={80}
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-25 opacity-0 hover:opacity-100">
                                        <span className="text-white font-bold text-xl">×</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col w-full md:col-span-2 md:flex-row justify-between items-center py-2">
                    <label className="flex lg:flex-row justify-between md:justify-center gap-x-4 items-center my-2 w-[90%] md:w-full">
                        <span className="label-text">¿Es monetizable?</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="flex lg:flex-row justify-between md:justify-center gap-x-4 items-center my-2 w-[90%] md:w-full">
                        <span className="label-text">¿Es un remix?</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="flex lg:flex-row justify-between md:justify-center gap-x-4 items-center my-2 w-[90%] md:w-full">
                        <span className="label-text">Publicar como anónimo</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                </div>

                <textarea
                    className="textarea bg-white w-full md:col-span-2 text-black"
                    placeholder="Descripción del modelo..."
                ></textarea>
            </div>
        </div>
    );
};

export default UploadFile;
