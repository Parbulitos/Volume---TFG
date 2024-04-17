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

    return (
        <div>
            {/* Componente para pantallas pequeñas (visible solo en pantallas menores que sm) */}
            <div className='sm:hidden mt-4'>
                <select className='select select-primary bg-primary font-bold text-xl w-full max-w-xs'>
                    {options.map((option, index) => (
                        <option key={index} onClick={() => handleClick(option)}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Componente para pantallas medianas y grandes (visible en sm y tamaños mayores) */}
            <div className='hidden md:block flex-col sm:flex-row sm:space-y-0 sm:space-x-2 p-4'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`btn w-32 h-16 p-4 text-white text-2xl font-bold ${
                            selectedOption === option ? 'btn-secondary' : 'btn-primary'
                        } transition-colors duration-300 hover:bg-violet-700`}
                        onClick={() => handleClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PrintOptions;
