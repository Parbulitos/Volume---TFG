import React, { useState } from 'react';

interface PrintOptionsProps {
    options: string[];
    onChange: (value: string) => void; //eslint-disable-line no-unused-vars
}

interface MaterialDetails {
    description: string;
    // price: number;  // Iré añadiendo lo que necesite
}

interface MaterialInfo {
    [key: string]: MaterialDetails | undefined;
}

const PrintOptions = ({ options, onChange }: PrintOptionsProps) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleClick = (option: string) => {
        setSelectedOption(option);
        onChange(option);
    };

    const materialInfo: MaterialInfo = {
        PLA: {
            description:
                'PLA es ideal para impresión 3D a nivel principiante debido a su baja temperatura de fusión y facilidad de uso. Es biodegradable y comúnmente usado para modelos que no estarán expuestos a altas temperaturas.',
        },
        ABS: {
            description:
                'ABS es conocido por su durabilidad y resistencia al impacto, ideal para crear objetos que requieren robustez como juguetes o piezas de uso mecánico. Requiere una temperatura más alta para imprimir y puede emitir olores durante el proceso.',
        },
        PETG: {
            description:
                'PETG combina la facilidad de impresión del PLA con la resistencia del ABS, siendo resistente a la humedad y a los químicos. Es adecuado para objetos que requieren una mayor resistencia y claridad, como piezas duraderas o componentes cosméticos.',
        },
        TPU: {
            description:
                'TPU es un material flexible y elástico, perfecto para imprimir objetos que necesitan estirarse o flexionarse como fundas de teléfono o juntas. Es resistente a la abrasión y al impacto.',
        },
    };

    return (
        // <div>
        //     {/* Componente para pantallas pequeñas (visible solo en pantallas menores que sm) */}
        //     <div className="mt-4 sm:hidden">
        //         <select className="select select-primary w-full max-w-xs bg-primary text-xl font-bold">
        //             {options.map((option, index) => (
        //                 <option key={index} onClick={() => handleClick(option)}>
        //                     {option}
        //                 </option>
        //             ))}
        //         </select>
        //     </div>

        //     {/* Componente para pantallas medianas y grandes (visible en sm y tamaños mayores) */}
        //     <div className="hidden flex-col p-4 sm:flex-row sm:space-x-2 sm:space-y-0 md:block">
        //         {options.map((option, index) => (
        //             <div
        //                 className="tooltip tooltip-primary"
        //                 data-tip={materialInfo[option]?.description}
        //                 key={index}
        //             >
        //                 <button
        //                     type="button"
        //                     className={`btn h-16 w-32 p-4 text-2xl font-bold text-white ${
        //                         selectedOption === option ? 'btn-secondary' : 'btn-primary'
        //                     } transition-colors duration-300 hover:bg-violet-700`}
        //                     onClick={() => handleClick(option)}
        //                 >
        //                     {option}
        //                 </button>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div>
            {/* Componente para pantallas pequeñas (visible solo en pantallas menores que sm) */}
            <div className="mt-4 sm:hidden">
                <select
                    className="select select-primary w-full max-w-xs bg-primary text-xl font-bold"
                    value={selectedOption}
                    onChange={(e) => handleClick(e.target.value)}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Componente para pantallas medianas y grandes (visible en sm y tamaños mayores) */}
            <div className="hidden flex-col p-4 sm:flex-row sm:space-x-2 sm:space-y-0 md:block">
                {options.map((option, index) => (
                    <div
                        className="tooltip tooltip-primary"
                        key={index}
                        data-tip={materialInfo[option]?.description}
                    >
                        <button
                            type="button"
                            className={`btn h-16 w-32 p-4 text-2xl font-bold text-white ${
                                selectedOption === option ? 'btn-secondary' : 'btn-primary'
                            } transition-colors duration-300 hover:bg-violet-700`}
                            onClick={() => handleClick(option)}
                        >
                            {option}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrintOptions;
