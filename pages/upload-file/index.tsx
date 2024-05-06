import Dropzone from '@/components/dropzone';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';

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

    const getImages = (event: ChangeEvent<HTMLInputElement>) => {
        const images = event.target.files;
        if (!images || images.length === 0) return;
        setImages((prevImages) => [...prevImages, ...Array.from(images)]);
        event.target.value = '';
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    };

    return (
        <div className="mx-auto mb-10 mt-5 flex w-full flex-col items-center justify-center lg:w-2/3">
            <Dropzone multipleFiles={true} onModelsDrop={onModelsDrop} />

            {droppedModels.length > 0 && (
                <div className="collapse collapse-arrow mt-6 w-[90%] bg-base-300 lg:w-[1000px]">
                    <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                    <div className="collapse-title text-xl font-medium">
                        Archivos subidos ({droppedModels.length})
                    </div>
                    <div className="collapse-content">
                        {droppedModels.map((model, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-base-200 p-4"
                            >
                                <p>{model.name}</p>
                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => handleRemoveModel(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 className="font mt-6 text-3xl font-bold text-white">Información Requerida</h2>
            <div className="mt-3 flex flex-col items-center gap-x-4 gap-y-5 md:grid md:w-[700px] md:grid-cols-2 lg:w-[1000px] lg:gap-x-16">
                <input
                    type="text"
                    placeholder="Nombre del modelo"
                    className="input input-bordered w-full bg-white text-black"
                />
                <select className="select select-bordered w-full bg-white text-gray-400">
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
                    className="input input-bordered w-full bg-white text-black"
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
                ) : (
                    <p>{images.length} imágenes seleccionadas</p>
                )}
                {images.length > 0 && (
                    <div className="flex w-full flex-col items-center justify-between py-2 md:col-span-2 md:flex-row">
                        <div className="relative flex gap-x-4">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className="relative h-20 w-20 overflow-hidden rounded-lg"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        className="h-full w-full object-cover"
                                        width={80}
                                        height={80}
                                    />
                                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-400 bg-opacity-25 opacity-0 hover:opacity-100">
                                        <span className="text-xl font-bold text-white">×</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex w-full flex-col items-center justify-between py-2 md:col-span-2 md:flex-row">
                    <label className="my-2 flex w-[90%] items-center justify-between gap-x-4 md:w-full md:justify-center lg:flex-row">
                        <span className="label-text">¿Es monetizable?</span>
                        <input type="checkbox" className="checkbox-primary checkbox" />
                    </label>
                    <label className="my-2 flex w-[90%] items-center justify-between gap-x-4 md:w-full md:justify-center lg:flex-row">
                        <span className="label-text">¿Es un remix?</span>
                        <input type="checkbox" className="checkbox-primary checkbox" />
                    </label>
                    <label className="my-2 flex w-[90%] items-center justify-between gap-x-4 md:w-full md:justify-center lg:flex-row">
                        <span className="label-text">Publicar como anónimo</span>
                        <input type="checkbox" className="checkbox-primary checkbox" />
                    </label>
                </div>

                <textarea
                    className="textarea w-full bg-white text-black md:col-span-2"
                    placeholder="Descripción del modelo..."
                ></textarea>
            </div>
        </div>
    );
};

export default UploadFile;
