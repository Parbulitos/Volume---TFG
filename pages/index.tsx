import 'animate.css';

import Poster from '@/components/poster';

export default function Page() {
    return (
        <div className="flex grid-cols-3 justify-center items-center px-4 py-16">
            <div className="md:w-[200px] md:h-[200px] lg:w-[600px] lg:h-[600px] justify-center items-center hidden md:block animate__animated animate__backInDown">
                <Poster imageUrl="/patito.png" url="/catalog"></Poster>
            </div>
            <div className="w-1/3 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-4 text-white text-center">
                    Bienvenido a Volume
                </h1>
                <p className="text-lg mb-8 text-white text-center">
                    Aquí podrás encontrar infinidad de modelos 3D, además de poder solicitar la
                    impresión de cualquiera de ellos
                </p>
            </div>

            <div className="md:w-[200px] md:h-[200px] lg:w-[600px] lg:h-[600px] justify-center items-center hidden md:block animate__animated animate__backInDown">
                <Poster imageUrl="/impresora.png" url="print-area" />
            </div>
        </div>
    );
}
