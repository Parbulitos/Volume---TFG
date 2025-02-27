// CatalogItem.js
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import patito from '../public/patito.png';
import { Models } from '@prisma/client';

interface CatalogItemProps {
    item: Models;
}

const CatalogItem = ({ item }: CatalogItemProps) => {
    return (
        <Link href={`/catalog/${item.id}`}>
            <div className="card card-compact h-80 w-80 bg-base-100 shadow-xl">
                <figure className="w-full h-full">
                    <Image
                        src={item.imgFileUrl || patito}
                        alt="model_image"
                        width={320}
                        height={320}
                        className="h-full w-full object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                </div>
            </div>{' '}
        </Link>
    );
};

export default CatalogItem;
