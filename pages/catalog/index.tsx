import Catalog from '@/components/catalog';
import CatalogCategories from '@/components/catalogCategories';
import CatalogOrderSearch from '@/components/catalogOrderSearch';
import CatalogSearchBar from '@/components/catalogSearchBar';

export default function Page() {
    return (
        <div className=" flex flex-col items-center justify-center">
            <CatalogSearchBar />
            <div className="flex items-center justify-center w-[50%] my-8">
                <CatalogCategories />
                <CatalogOrderSearch />
            </div>
            <Catalog />
        </div>
    );
}
