import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import StlView from '@/components/stlView';
import { IoHeartOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';
import { BsPrinter } from 'react-icons/bs';
import { AiOutlineDownload } from 'react-icons/ai';
import { IoShareSocialOutline } from 'react-icons/io5';
import { IoBookmarkOutline } from 'react-icons/io5';

import patito from '../../public/patito.png';
import Tabs from '@/components/modelInfoTabs';
import { useModels } from '@/hooks/useModels';

const ModelView = () => {
    const items = [
        { id: 1, name: 'Item 1', description: 'algo para probar' },
        { id: 2, name: 'Item 2', description: 'algo para probar' },
        { id: 3, name: 'Item 3', description: 'algo para probar' },
        { id: 4, name: 'Item 4', description: 'algo para probar' },
        { id: 5, name: 'Item 5', description: 'algo para probar' },
        { id: 6, name: 'Item 6', description: 'algo para probar' },
        { id: 7, name: 'Item 7', description: 'algo para probar' },
        { id: 8, name: 'Item 8', description: 'algo para probar' },
        { id: 9, name: 'Item 9', description: 'algo para probar' },
        { id: 10, name: 'Item 10', description: 'algo para probar' },
        { id: 11, name: 'Item 11', description: 'algo para probar' },
        { id: 12, name: 'Item 12', description: 'algo para probar' },
        { id: 13, name: 'Item 13', description: 'algo para probar' },
    ];

    const router = useRouter();
    const { id } = router.query;
    const model = items.find((model) => model.id === Number(id));

    if (!model) {
        return <p className="mt-5 text-center">Producto no encontrado</p>;
    }

    return (
        <div className="my-5 flex flex-col items-center justify-center">
            <div className="flex w-full items-end justify-between md:w-4/5 md:flex-row lg:w-3/5">
                <h1 className="ml-5 text-center text-4xl font-bold md:text-left md:text-5xl lg:text-6xl">
                    {model.name}
                </h1>
                <div className="mr-5 flex flex-row gap-3 md:justify-end">
                    <BsPrinter className="h-[40px] w-[40px]" />
                    <button
                        onClick={() => {
                            useModels().getModelFileById('94831aea-019b-47ab-8a29-01bcd78f0ea0');
                        }}
                    >
                        <AiOutlineDownload className="h-[40px] w-[40px]" />
                    </button>
                </div>
            </div>
            <div className="mx-auto mt-3 h-auto rounded-lg border p-5 shadow-lg md:h-[500px] md:w-4/5 lg:w-3/5">
                <div className="mb-4 flex flex-row items-center gap-3 md:mb-0">
                    <IoHeartOutline className="h-[20px] w-[20px] md:h-[40px] md:w-[40px]" />
                    123
                    <IoEyeOutline className="h-[20px] w-[20px] md:h-[40px] md:w-[40px]" />
                    123
                </div>
                <StlView
                    fileUrl="https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
                    scale={1.5}
                />
            </div>

            <div className="mt-4 flex w-full flex-col items-center md:w-4/5 lg:grid lg:w-3/5 lg:grid-cols-4">
                <div className="col-span-2 mb-4 flex items-center gap-4 md:mb-0">
                    <Image
                        src={patito}
                        alt="User"
                        className="h-[50px] w-[50px] rounded-full bg-slate-600"
                    ></Image>
                    <p>Nombre del creador</p>
                </div>
                <div className="my-4 flex items-center justify-center gap-2 md:justify-end lg:my-0">
                    <div className="badge badge-primary badge-outline badge-lg">tag 1</div>
                    <div className="badge badge-primary badge-outline badge-lg">tag 2</div>
                    <div className="badge badge-primary badge-outline badge-lg">tag 3</div>
                </div>
                <div className="my-4 flex items-center justify-center gap-4 md:justify-end lg:my-0">
                    <button>
                        <IoHeartOutline className="h-[30px] w-[30px]" />
                    </button>
                    <button>
                        <IoShareSocialOutline className="h-[30px] w-[30px]" />
                    </button>
                    <button>
                        <IoBookmarkOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
            </div>
            <Tabs />
        </div>
    );
};

export default ModelView;
