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
        return <p className='text-center mt-5'>Producto no encontrado</p>;
    }

    return (
        // <div className='flex flex-col items-center justify-center my-5'>
        //     <div className='flex flex-row w-3/5 items-end justify-between'>
        //         <div className='flex gap-3 items-center'>
        //             <IoHeartOutline className='w-[40px] h-[40px]' />
        //             123
        //             <IoEyeOutline className='w-[40px] h-[40px]' />
        //             123
        //         </div>
        //         <h1 className='text-6xl font-bold'>{model.name}</h1>
        //         <div className='flex gap-3'>
        //             <BsPrinter className='w-[40px] h-[40px]' />
        //             <AiOutlineDownload className='w-[40px] h-[40px]' />
        //         </div>
        //     </div>
        //     <div className='w-3/5 h-[500px] mx-auto mt-3 p-5 border rounded-lg shadow-lg'>
        //         <StlView fileUrl='https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl' />
        //     </div>

        //     <div className='grid grid-cols-4 items-center w-3/5 mt-2'>
        //         <div className='flex items-center col-span-2 gap-4'>
        //             <Image
        //                 src={patito}
        //                 alt='User'
        //                 className='w-[50px] h-[50px] rounded-full bg-slate-600'
        //             ></Image>
        //             <p>Nombre del creador</p>
        //         </div>
        //         <div className='flex items-center justify-end gap-2'>
        //             <div className='badge badge-primary badge-outline'>tag 1</div>
        //             <div className='badge badge-primary badge-outline'>tag 2</div>
        //             <div className='badge badge-primary badge-outline'>tag 3</div>
        //         </div>
        //         <div className='flex items-center justify-end gap-4'>
        //             <button>
        //                 <IoHeartOutline className='w-[30px] h-[30px]' />
        //             </button>
        //             <button>
        //                 <IoShareSocialOutline className='w-[30px] h-[30px]' />
        //             </button>
        //             <button>
        //                 <IoBookmarkOutline className='w-[30px] h-[30px]' />
        //             </button>
        //         </div>
        //     </div>
        //     <Tabs />
        // </div>
        <div className='flex flex-col items-center justify-center my-5'>
            <div className='flex md:flex-row w-full md:w-4/5 lg:w-3/5 items-end justify-between'>
                <h1 className='text-4xl ml-5 md:text-5xl lg:text-6xl font-bold text-center md:text-left'>
                    {model.name}
                </h1>
                <div className='flex flex-row gap-3 md:justify-end mr-5'>
                    <BsPrinter className='w-[40px] h-[40px]' />
                    <AiOutlineDownload className='w-[40px] h-[40px]' />
                </div>
            </div>
            <div className='md:w-4/5 lg:w-3/5 h-auto md:h-[500px] mx-auto mt-3 p-5 border rounded-lg shadow-lg'>
                <div className='flex flex-row gap-3 items-center mb-4 md:mb-0'>
                    <IoHeartOutline className='w-[20px] h-[20px] md:w-[40px] md:h-[40px]' />
                    123
                    <IoEyeOutline className='w-[20px] h-[20px] md:w-[40px] md:h-[40px]' />
                    123
                </div>
                <StlView fileUrl='https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl' />
            </div>

            <div className='flex flex-col lg:grid lg:grid-cols-4 items-center w-full md:w-4/5 lg:w-3/5 mt-4'>
                <div className='flex items-center col-span-2 gap-4 mb-4 md:mb-0'>
                    <Image
                        src={patito}
                        alt='User'
                        className='w-[50px] h-[50px] rounded-full bg-slate-600'
                    ></Image>
                    <p>Nombre del creador</p>
                </div>
                <div className='flex items-center justify-center md:justify-end gap-2 my-4 lg:my-0'>
                    <div className='badge badge-primary badge-outline badge-lg'>tag 1</div>
                    <div className='badge badge-primary badge-outline badge-lg'>tag 2</div>
                    <div className='badge badge-primary badge-outline badge-lg'>tag 3</div>
                </div>
                <div className='flex items-center justify-center md:justify-end gap-4 my-4 lg:my-0'>
                    <button>
                        <IoHeartOutline className='w-[30px] h-[30px]' />
                    </button>
                    <button>
                        <IoShareSocialOutline className='w-[30px] h-[30px]' />
                    </button>
                    <button>
                        <IoBookmarkOutline className='w-[30px] h-[30px]' />
                    </button>
                </div>
            </div>
            <Tabs />
        </div>
    );
};

export default ModelView;
