import 'animate.css';

import Poster from '@/components/poster';
import { useModels } from '@/hooks/useModels';

export default function Page() {
    return (
        <div className="flex grid-cols-3 items-center justify-center px-4 py-16">
            <div className="animate__animated animate__backInDown hidden items-center justify-center md:block md:h-[200px] md:w-[200px] lg:h-[600px] lg:w-[600px]">
                <Poster imageUrl="/patito.png" url="/catalog"></Poster>
                <button
                    className="btn"
                    onClick={() => {
                        useModels().getModelFileById('889dfdfe-e636-4f93-bc16-1439eecfbf4e');
                    }}
                >
                    GETMODELFILE
                </button>
            </div>
            <div className="flex w-1/3 flex-col items-center justify-center">
                <h1 className="mb-4 text-center text-4xl font-bold text-white">
                    Bienvenido a Volume
                </h1>
                <p className="mb-8 text-center text-lg text-white">
                    Aquí podrás encontrar infinidad de modelos 3D, además de poder solicitar la
                    impresión de cualquiera de ellos
                </p>
            </div>

            <div className="animate__animated animate__backInDown hidden items-center justify-center md:block md:h-[200px] md:w-[200px] lg:h-[600px] lg:w-[600px]">
                <Poster imageUrl="/impresora.png" url="print-area" />
            </div>
        </div>
    );
}
