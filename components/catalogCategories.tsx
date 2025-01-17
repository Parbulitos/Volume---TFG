import React, { useState } from 'react';

interface CatalogCategoriesProps {
    selected: string;
    setSelected: (selected: string) => void;
}

// const CatalogCategories = ({ selected, setSelected }: CatalogCategoriesProps) => {
//     // const [selected, setSelected] = useState('Categorías');
//     return (
//         <div className="flex w-full items-center justify-center">
//             <select
//                 className="select select-bordered w-full max-w-xs"
//                 defaultValue={selected}
//                 onChange={(e) => setSelected(e.target.value)}
//             >
//                 <option disabled>Categorías</option>
//                 <option
//                     onClick={() => {
//                         setSelected('Arte');
//                     }}
//                 >
//                     Arte
//                 </option>
//                 <option
//                     onClick={() => {
//                         setSelected('Moda');
//                     }}
//                 >
//                     Moda
//                 </option>
//                 <option
//                     onClick={() => {
//                         setSelected('Gadgets');
//                     }}
//                 >
//                     Gadgets
//                 </option>
//                 <option
//                     onClick={() => {
//                         setSelected('Juguetes');
//                     }}
//                 >
//                     Juguetes
//                 </option>
//                 <option
//                     onClick={() => {
//                         setSelected('Friki');
//                     }}
//                 >
//                     Friki
//                 </option>
//                 <option
//                     onClick={() => {
//                         setSelected('Herramientas');
//                     }}
//                 >
//                     Herramientas
//                 </option>
//                 <option
//                     onClick={() => {
//                         setSelected('Hogar');
//                     }}
//                 >
//                     Hogar
//                 </option>
//             </select>
//         </div>
//     );
// };
const CatalogCategories = ({ selected, setSelected } : {selected: any, setSelected: any}) => {
    return (
        <div className="flex w-full items-center justify-center">
            <select
                className="select select-bordered w-full max-w-xs"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                <option disabled value="Categorías">
                    Categorías
                </option>
                <option value="Todos">Todos</option>
                <option value="Arte">Arte</option>
                <option value="Moda">Moda</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Friki">Friki</option>
                <option value="Herramientas">Herramientas</option>
                <option value="Hogar">Hogar</option>
            </select>
        </div>
    );
};

export default CatalogCategories;
