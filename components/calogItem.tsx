// CatalogItem.js
import Image from "next/image";
import React from "react";
import patito from "../public/patito.png";

const CatalogItem = ({ item }: { item: any }) => {
    return (
        <div>
            <div className='card card-compact w-80 h-80 bg-base-100 shadow-xl'>
                <figure>
                    <Image
                        src={patito}
                        alt='Shoes'
                    />
                </figure>
                <div className='card-body'>
                    <h2 className='card-title'>{item.name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
            </div>{" "}
        </div>
    );
}

export default CatalogItem;
