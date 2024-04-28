import React, { useState } from "react";

import CatalogItem from "./calogItem";

const Catalog = () => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
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
        <div className='flex flex-col items-center justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6'>
                {itemsToShow.map((item) => (
                    <CatalogItem key={item.id} item={item} />
                ))}
            </div>
            <div className='join my-5'>
                <button className='join-item btn btn-primary' onClick={goToPrevPage}>«</button>
                <button className='join-item btn btn-primary no-animation hover:bg-primary hover:border-transparent cursor-default'>{currentPage + 1}</button>
                <button className='join-item btn btn-primary' onClick={goToNextPage}>»</button>
            </div>
        </div>
    );
};

export default Catalog;
