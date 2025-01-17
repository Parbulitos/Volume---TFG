import React, { useState } from 'react';

const CatalogOrderSearch = ({ selected, setSelected }: {selected: any, setSelected: any}) => {
    return (
        <div className="flex w-full items-center justify-center">
            <select
                className="select select-bordered w-full max-w-xs"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                <option disabled value="Filtrar por...">
                    Filtrar por...
                </option>
                <option value="Recientes">Recientes</option>
                <option value="semana">Popular última semana</option>
                <option value="mes">Popular último mes</option>
                <option value="año">Popular último año</option>
                <option value="populares">Más populares</option>
            </select>
        </div>
    );
};

export default CatalogOrderSearch;
