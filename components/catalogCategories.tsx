import React from 'react';

const CatalogCategories = () => {
    return (
        <div className="flex items-center justify-center w-full">
            <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                    Categorías
                </option>
                <option>Arte</option>
                <option>Moda</option>
                <option>Gadgets</option>
                <option>Juguetes</option>
                <option>Friki</option>
                <option>Herramientas</option>
                <option>Hogar</option>
            </select>
        </div>
    );
};

export default CatalogCategories;
