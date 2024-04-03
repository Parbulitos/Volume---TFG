import 'animate.css'

import Poster from "@/components/poster";

export default function Page() {
  return (
    <div className="flex grid-cols-3 justify-center items-center px-4 py-16">
      <div className="w-[600px] h-[600px] flex justify-center items-center animate__animated animate__backInLeft">
        <Poster imageUrl="/patito.png" width={500} height={500} url="/catalog"></Poster>
      </div>
      <div className="w-1/3 text-center">
        <h1 className="text-4xl font-bold mb-4 text-white text-center">Bienvenido a Volume</h1>
        <p className="text-lg mb-8 text-white text-center">
          Aquí podrás encontrar infinidad de modelos 3D,
          además de poder solicitar la impresión de cualquiera de ellos
        </p>
      </div>
      <div className="w-[600px] h-[600px] flex justify-center items-center animate__animated animate__backInRight">
        <Poster imageUrl="/impresora.png" width={600} height={600} url="print-area"/>
      </div>
    </div>
  );
}
