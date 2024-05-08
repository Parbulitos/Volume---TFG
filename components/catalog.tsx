import React, { useState } from 'react';

import CatalogItem from './calogItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const Catalog = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
        { id: 6, name: 'Item 6' },
        { id: 7, name: 'Item 7' },
        { id: 8, name: 'Item 8' },
    ]);

    const [hasMoreItems, setHasMoreItems] = useState(true);

    const fetchMoreItems = () => {
        if (items.length >= 19) {
            // Asumiendo que 19 es el número total de ítems para este ejemplo
            setHasMoreItems(false);
            return;
        }

        setTimeout(() => {
            setItems((prevItems) => [
                ...prevItems,
                ...Array.from({ length: 4 }, (_, index) => ({
                    id: prevItems.length + index + 1,
                    name: `Item ${prevItems.length + index + 1}`,
                })),
            ]);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <InfiniteScroll
                dataLength={items.length}
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
