import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useModels } from '@/hooks/useModels';
import { Models } from '@prisma/client';
import CatalogItem from './catalogItem';

const Catalog = () => {
    const [items, setItems] = useState<Models[]>([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const { getCatalogModels } = useModels();
    const ITEMS_PER_PAGE = 100;

    const fetchMoreItems = async () => {
        try {
            const newItems = await getCatalogModels(ITEMS_PER_PAGE);
            if (newItems.length < ITEMS_PER_PAGE) {
                setHasMoreItems(false);
            }
            setItems((prevItems) => [...prevItems, ...newItems]);
        } catch (error) {
            console.error('Error fetching more items:', error);
            setHasMoreItems(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const initialItems = await getCatalogModels(ITEMS_PER_PAGE);
                setItems(initialItems);
                if (initialItems.length < ITEMS_PER_PAGE) {
                    setHasMoreItems(false);
                }
            } catch (error) {
                console.error('Error fetching initial items:', error);
                setItems([]); // Asegúrate de que items no sea undefined incluso si hay un error
            }
        };
        fetchData();
    }, [getCatalogModels]);

    return (
        <div className="flex flex-col items-center justify-center">
            <InfiniteScroll
                dataLength={items.length} // Aquí no debería haber problema porque items se inicializa como un array vacío
                next={fetchMoreItems}
                hasMore={hasMoreItems}
                loader={
                    <span className="w- z- loading loading-ring z-[1] my-8 w-20 text-primary"></span>
                }
                endMessage={
                    <p style={{ textAlign: 'center' }} className="my-10">
                        <b>¡Hey! Ya lo has visto todo</b>
                    </p>
                }
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    {items.map((item) => (
                        <CatalogItem key={item.id} item={item} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Catalog;
