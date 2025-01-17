import Catalog from '@/components/catalog';
import CatalogCategories from '@/components/catalogCategories';
import CatalogOrderSearch from '@/components/catalogOrderSearch';
import CatalogSearchBar from '@/components/catalogSearchBar';
import { useState } from 'react';

export default function Page() {
    const [selectedCategory, setSelectedCategory] = useState('Categorías');
    const [selectedFilter, setSelectedFilter] = useState('Filtrar por...');
    return (
        <div className=" flex flex-col items-center justify-center">
            <CatalogSearchBar />
            <div className="my-8 flex w-[50%] items-center justify-center">
                <CatalogCategories selected={selectedCategory} setSelected={setSelectedCategory}/>
                <CatalogOrderSearch selected={selectedFilter} setSelected={setSelectedFilter}/>
            </div>
            <Catalog category={selectedCategory} filter={selectedFilter}/>
        </div>
    );
}
