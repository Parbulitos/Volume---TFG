import React, { useState } from 'react';

interface PrintOptionsProps {
    options: string[];
    onChange: (value: string) => void;
}

const PrintOptions = ({ options, onChange }: PrintOptionsProps) => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [dropdownClosed, setDropdownClosed] = useState<boolean>(false);

    const handleClick = (option: string) => {
        setSelectedOption(option);
        onChange(option);
    };

    const materialInfo = {
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
        <div>
            {/* Componente para pantallas pequeñas (visible solo en pantallas menores que sm) */}
            <div className="sm:hidden mt-4">
                <select className="select select-primary bg-primary font-bold text-xl w-full max-w-xs">
                    {options.map((option, index) => (
                        <option key={index} onClick={() => handleClick(option)}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Componente para pantallas medianas y grandes (visible en sm y tamaños mayores) */}
            <div className="hidden md:block flex-col sm:flex-row sm:space-y-0 sm:space-x-2 p-4">
                {options.map((option, index) => (
                    <div className="tooltip" data-tip={materialInfo} key={index}>
                        <button
                            className={`btn w-32 h-16 p-4 text-white text-2xl font-bold ${
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
