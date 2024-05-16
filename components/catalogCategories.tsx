import React, { useState } from 'react';

const CatalogCategories = () => {
    const [selected, setSelected] = useState('Categorías');
    return (
        <div className="flex w-full items-center justify-center">
            <select className="select select-bordered w-full max-w-xs" defaultValue={selected}>
                <option disabled>
                    Categorías
                </option>
                <option onClick={() => {setSelected('Arte')}}>Arte</option>
                <option onClick={() => {setSelected('Moda')}}>Moda</option>
                <option onClick={() => {setSelected('Gadgets')}}>Gadgets</option>
                <option onClick={() => {setSelected('Juguetes')}}>Juguetes</option>
                <option onClick={() => {setSelected('Friki')}}>Friki</option>
                <option onClick={() => {setSelected('Herramientas')}}>Herramientas</option>
                <option onClick={() => {setSelected('Hogar')}}>Hogar</option>
            </select>
        </div>
    );
};

export default CatalogCategories;
