import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import StlView from '@/components/stlView';
import {
    IoHeartOutline,
    IoEyeOutline,
    IoShareSocialOutline,
    IoBookmarkOutline,
    IoHeart,
    IoBookmark
} from 'react-icons/io5';
import { BsPrinter } from 'react-icons/bs';
import { AiOutlineDownload, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import patito from '../../public/patito.png';
import Tabs from '@/components/modelInfoTabs';
import { useModels } from '@/hooks/useModels';
import { ModelItems, Models, Users } from '@prisma/client';
import { useUsers } from '@/hooks/useUsers';
import Link from 'next/link';
import Swal from 'sweetalert2';

const ModelView = () => {
    const { getModelById, getModelItemFileUrlById, getModelItemsByParentId } = useModels();
    const { getUserById } = useUsers();
    const router = useRouter();
    const { id } = router.query;
    const [model, setModel] = useState<Models | null>(null);
    const [modelItems, setModelItems] = useState<ModelItems[]>([]);
    const [modelItemUrls, setModelItemUrls] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const [owner, setOwner] = useState<Users>();

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                // Fetch model data
                const fetchedModel = await getModelById(id as string);
                setModel(fetchedModel);

                console.log(fetchedModel?.ownerId);
                setOwner(await getUserById(fetchedModel?.ownerId as string));

                // Fetch model items
                const fetchedModelItems = await getModelItemsByParentId(id as string);
                setModelItems(fetchedModelItems);

                // Fetch URLs of all model items
                const fetchedModelItemUrls = await Promise.all(
                    fetchedModelItems.map(async (item) => {
                        const url = await getModelItemFileUrlById(item.id);
                        return url.url;
                    })
                );
                setModelItemUrls(fetchedModelItemUrls);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (model && initialLoad) {
            setLikes(model.likes ?? 0);
        }
    }, [model, initialLoad])

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % modelItemUrls.length);
    };

    const handlePrevious = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + modelItemUrls.length) % modelItemUrls.length
        );
    };

    const handleShare = () => {
        const currentUrl = window.location.href;
        Swal.fire({
            title: "¡Enlace copiado!",
            text: "El enlace se ha copiado al portapapeles",
            icon: "success"
          });
        // O copiarlo al portapapeles
        navigator.clipboard.writeText(currentUrl);
        console.log(currentUrl)
    };

    const handleSave = () => {
        setIsSaved((isSaved) => !isSaved);
        Swal.fire({
            title: "Modelo guardado",
            text: "El modelo se ha guardado correctamente",
            icon: "success"
          });
    }

    const handleLike = () => {
        setIsLiked((isLiked) => !isLiked);
        if (isLiked) {
            setLikes((likes) => likes - 1);
        } else {
            setLikes((likes) => likes + 1);
        }
    }

    if (loading) {
        return <p className="mt-5 text-center">Cargando...</p>;
    }

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
                            useModels().getModelFileById(model.id);
                        }}
                    >
                        <AiOutlineDownload className="h-[40px] w-[40px]" />
                    </button>
                </div>
            </div>
            <div className="mt-3 flex w-full items-center justify-center md:pl-10 md:pr-10 lg:pl-0 lg:pr-0">
                <button
                    onClick={handlePrevious}
                    className="hidden rounded-full bg-primary p-2 md:flex"
                >
                    <AiOutlineLeft className="h-10 w-10" />
                </button>
                <div className="mx-4 h-auto rounded-lg border p-5 shadow-lg md:h-[500px] md:w-4/5 lg:w-3/5">
                    <div className="mb-4 flex flex-row items-center gap-5 md:mb-0">
                        <button
                            className="flex items-center justify-center gap-3"
                            onClick={handleLike}
                        >
                            {isLiked ? (
                                <IoHeart className="h-[20px] w-[20px] md:h-[40px] md:w-[40px]" />
                            ) : (
                                <IoHeartOutline className="h-[20px] w-[20px] md:h-[40px] md:w-[40px]" />
                            )}
                            {likes?.toString()}
                        </button>
                        <IoEyeOutline className="h-[20px] w-[20px] md:h-[40px] md:w-[40px]" />
                        {model.views}
                    </div>
                    <StlView fileUrl={modelItemUrls[currentIndex] || ''} scale={1.5} />
                </div>
                <button onClick={handleNext} className="hidden rounded-full bg-primary p-2 md:flex">
                    <AiOutlineRight className="h-10 w-10" />
                </button>
            </div>
            <div className="mt-5 flex gap-x-4 md:hidden">
                <button onClick={handlePrevious} className="rounded-full bg-primary p-2">
                    <AiOutlineLeft className="h-5 w-5" />
                </button>
                <button onClick={handleNext} className="rounded-full bg-primary p-2">
                    <AiOutlineRight className="h-5 w-5" />
                </button>
            </div>
            <div className="mt-4 flex w-full flex-col items-center md:w-4/5 lg:grid lg:w-3/5 lg:grid-cols-4">
                <div className="col-span-2 mb-4 flex items-center gap-4 md:mb-0">
                    <Image
                        src={owner?.avatarUrl || patito}
                        alt="User"
                        className="h-[50px] w-[50px] rounded-full bg-slate-600"
                        width={50}	
                        height={50}
                    />
                    <Link href={`/user-profile/${owner?.id}`}>
                        {owner?.username || 'Nombre del creador'}
                    </Link>
                </div>
                <div className="my-4 flex gap-4 md:justify-end lg:col-span-2 lg:my-0">
                    <button>
                        <IoShareSocialOutline className="h-[40px] w-[40px]" onClick={handleShare} />
                    </button>
                    <button
                            className="flex items-center justify-center gap-3"
                            onClick={handleSave}
                        >
                            {isSaved ? (
                                <IoBookmark className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]" />
                            ) : (
                                <IoBookmarkOutline className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]" />
                            )}
                        </button>
                </div>
            </div>
            <Tabs {...model} />
        </div>
    );
};

export default ModelView;
