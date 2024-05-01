import Catalog from '@/components/catalog';
import CatalogCategories from '@/components/catalogCategories';
import CatalogOrderSearch from '@/components/catalogOrderSearch';
import CatalogSearchBar from '@/components/catalogSearchBar';

export default function Page() {
    return (
        <div className=" flex flex-col items-center justify-center">
            <CatalogSearchBar />
            <div className="my-8 flex w-[50%] items-center justify-center">
                <CatalogCategories />
                <CatalogOrderSearch />
            </div>
            <Catalog />
        </div>
    );
}
