import Dropzone from '@/components/dropzone';
import { useModels } from '@/hooks/useModels';
import { useUserContext } from '@/hooks/useUserContext';
import { Models } from '@prisma/client';
import Image from 'next/image';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

interface FormState {
    modelName: string;
    category: string;
    tags: string;
    images: File[];
    isMonetizable: boolean;
    isRemix: boolean;
    publishAnonymously: boolean;
    description: string;
}

const UploadFile = () => {
    const [droppedModels, setDroppedModels] = useState<File[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const { addModel, getModelFileById } = useModels();
    const imageInputRef = useRef(null);
    const [UIBlocked, setUIBlocked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formState, setFormState] = useState<FormState>({
        modelName: '',
        category: '',
        tags: '',
        images: [],
        isMonetizable: false,
        isRemix: false,
        publishAnonymously: false,
        description: '',
    });

    const { userDetails } = useUserContext();

    const onModelsDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        setDroppedModels((prevFiles) => [...prevFiles, ...acceptedFiles]);
        console.log('Archivos aceptados: ', acceptedFiles);
    };

    const upload = async () => {
        const uploadTime = new Date();
        const file = droppedModels.pop();
        //Check for validity fields
        const model = {
            collectionId: null,
            description: formState.description,
            fileUrl: '',
            imgFileUrl: null,
            anonymous: null,
            grade: 0,
            likes: 0,
            name: formState.modelName,
            ownerId: userDetails?.id,
            uploadTime: uploadTime,
            views: 0,
            category: formState.category,
            isMonetizable: formState.isMonetizable,
            isRemix: formState.isRemix,
            publishAnonymously: formState.publishAnonymously,
        } as Omit<Models, 'id'>;
        if (!file || !userDetails) return;
        await addModel(model, userDetails.id, file);
        // Download file
        // getModelFileById('123','testModel.stl')
    };

    const handleRemoveModel = (index: number) => {
        setDroppedModels((prevModels) => {
            const newModels = [...prevModels];
            newModels.splice(index, 1);
            return newModels;
        });
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked, files } = event.target as HTMLInputElement;
        if (type === 'file' && files) {
            // Agregar los nuevos archivos a los ya existentes en lugar de reemplazarlos
            setFormState((prev) => ({
                ...prev,
                images: [...prev.images, ...Array.from(files)],
            }));
        } else if (type === 'checkbox') {
            setFormState((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormState((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRemoveImage = (index: number) => {
        setFormState((prev) => {
            const newImages = [...prev.images];
            newImages.splice(index, 1);
            return { ...prev, images: newImages };
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Process your form data here
        await upload();
    };

    useEffect(() => {
        if (!userDetails) {
            setUIBlocked(true);
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success ml-3',
                    cancelButton: 'btn btn-error mr-3',
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title: 'Tienes que iniciar sesión para subir archivos',
                    text: '¿Quieres iniciar sesión?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Iniciar Sesión',
                    cancelButtonText: 'No, gracias',
                    reverseButtons: true,
                    allowOutsideClick: false,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        router.push('/sign');
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        router.push('/');
                    }
                });
        }
        const { modelName, category, description } = formState;
        setIsFormValid(
            modelName !== '' && category !== '' && description !== '' && droppedModels.length > 0
        );
    }, [formState, userDetails]);

    return (
        <div>
            {UIBlocked ? (
                <div className="h-screen">Cargando...</div>
            ) : (
                <div className="mx-auto mb-10 mt-5 flex w-full flex-col items-center justify-center lg:w-2/3">
                    <Dropzone multipleFiles={true} onModelsDrop={onModelsDrop} />
                    {droppedModels.length > 0 && (
                        <div className="collapse collapse-arrow mt-6 w-[90%] bg-base-300 lg:w-[1000px]">
                            <input
                                type="checkbox"
                                checked={isOpen}
                                onChange={() => setIsOpen(!isOpen)}
                            />
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

                    <h2 className="font mt-6 text-3xl font-bold text-white">
                        Información Requerida
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-3 flex flex-col items-center gap-x-4 gap-y-5 md:grid md:w-[700px] md:grid-cols-2 lg:w-[1000px] lg:gap-x-16">
                            <input
                                type="text"
                                name="modelName"
                                placeholder="Nombre del modelo"
                                value={formState.modelName}
                                onChange={handleInputChange}
                                className="input input-bordered w-full bg-white text-black"
                            />
                            <select
                                className="select select-bordered w-full bg-white text-gray-400"
                                name="category"
                                value={formState.category}
                                onChange={handleInputChange}
                            >
                                <option defaultValue={''}>Categoría</option>
                                <option>Cat 1</option>
                                <option>Cat 2</option>
                                <option>Cat 3</option>
                                <option>Cat 4</option>
                                <option>Cat 5</option>
                            </select>
                            <input
                                type="text"
                                name="tags"
                                placeholder="Tags"
                                value={formState.tags}
                                onChange={handleInputChange}
                                className="input input-bordered w-full bg-white text-black"
                            />

                            <input
                                type="file"
                                multiple
                                accept="image/png, image/jpeg, image/gif"
                                className="file-input file-input-bordered w-full bg-white text-black"
                                onChange={handleInputChange}
                                ref={imageInputRef}
                            />

                            {formState.images.length === 1 ? (
                                <p>{formState.images.length} imágen seleccionada</p>
                            ) : (
                                <p>{formState.images.length} imágenes seleccionadas</p>
                            )}
                            {formState.images.length > 0 && (
                                <div className="flex w-full flex-col items-center justify-between py-2 md:col-span-2 md:flex-row">
                                    <div className="relative flex gap-x-4">
                                        {formState.images.map((image, index) => (
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
                                                    <span className="text-xl font-bold text-white">
                                                        ×
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex w-full flex-col items-center justify-between py-2 md:col-span-2 md:flex-row">
                                <label className="my-2 flex w-[90%] items-center justify-between gap-x-4 md:w-full md:justify-center lg:flex-row">
                                    <span className="label-text">¿Es monetizable?</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox-primary checkbox"
                                        name="isMonetizable"
                                        checked={formState.isMonetizable}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label className="my-2 flex w-[90%] items-center justify-between gap-x-4 md:w-full md:justify-center lg:flex-row">
                                    <span className="label-text">¿Es un remix?</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox-primary checkbox"
                                        name="isRemix"
                                        checked={formState.isRemix}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label className="my-2 flex w-[90%] items-center justify-between gap-x-4 md:w-full md:justify-center lg:flex-row">
                                    <span className="label-text">Publicar como anónimo</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox-primary checkbox"
                                        name="publishAnonymously"
                                        checked={formState.publishAnonymously}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>

                            <textarea
                                className="textarea w-full bg-white text-black md:col-span-2"
                                placeholder="Descripción del modelo..."
                                name="description"
                                value={formState.description}
                                onChange={handleInputChange}
                            ></textarea>
                            <button
                                className="btn btn-primary h-8 w-full md:col-span-2"
                                type="submit"
                                onClick={() => {
                                    upload();
                                }}
                                disabled={!isFormValid}
                            >
                                Subir
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UploadFile;
