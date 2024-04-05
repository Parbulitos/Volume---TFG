// Catalog.js
import React, { useState } from "react";
import CatalogItem from "./calogItem";

function Catalog(
    {
        /* items */
    }
) {
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(0); // Añadido para paginación

    const items = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" },
        { id: 5, name: "Item 5" },
        { id: 6, name: "Item 6" },
        { id: 7, name: "Item 7" },
        { id: 8, name: "Item 8" },
        { id: 9, name: "Item 9" },
        { id: 10, name: "Item 10" },
        { id: 11, name: "Item 11" },
        { id: 12, name: "Item 12" },
        { id: 13, name: "Item 13" },
        // Add more items as needed
    ];

    // Calcula el número total de páginas
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Calcula los índices de los items para la página actual
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = items.slice(startIndex, endIndex);

    // Funciones para cambiar de página
    const goToNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages); // Avanza y vuelve al principio si es necesario
    };

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages); // Retrocede y va al final si es necesario
    };

    const updateItemsPerPage = (newSize: number) => {
        setItemsPerPage(newSize);
        setCurrentPage(0); // Restablece la página actual a la primera página
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4"> {/* Asegura que los CatalogItem estén centrados y con un espacio entre ellos */}
                {itemsToShow.map(item => (
                <CatalogItem key={item.id} item={item} />
                ))}
            </div>
            <div className="flex justify-center gap-4 mb-4"> {/* Botones de Anterior y Siguiente con espacio entre ellos */}
                <button onClick={goToPrevPage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out">Anterior</button>
                <button onClick={goToNextPage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out">Siguiente</button>
            </div>
            <div className="flex justify-center gap-4"> {/* Botones para cambiar la cantidad de ítems por página, también con espacio */}
                {[8, 12, 16, 64].map(size => (
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out" key={size} onClick={() => updateItemsPerPage(size)}>
                    {size} Items por página
                </button>
                ))}
            </div>
        </div>
    );
}

export default Catalog;
