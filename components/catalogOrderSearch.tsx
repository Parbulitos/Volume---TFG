import React, { useState } from 'react';

const CatalogOrderSearch = () => {
    const [selected, setSelected] = useState('Filtrar por...');
    return (
        <div className="flex w-full items-center justify-center">
            <select className="select select-bordered w-full max-w-xs" defaultValue={selected}>
                <option disabled>
                    Filtrar por...
                </option>
                <option onClick={() => {setSelected('Recientes')}}>Recientes</option>
                <option onClick={() => {setSelected('Popular última semana')}}>Popular última semana</option>
                <option onClick={() => {setSelected('Popula popu laresr último mes')}}>Popular último mes</option>
                <option onClick={() => {setSelected('Pop popu laresular último año')}}>Popular último año</option>
                <option onClick={() => {setSelected('Más popu lares')}}>Más populares</option>
            </select>
        </div>
    );
};

export default CatalogOrderSearch;
