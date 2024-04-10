import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({
    multipleFiles,
    onModelsDrop,
    size,
}: {
    multipleFiles: boolean;
    onModelsDrop: Function;
    size: { width: number; height: number };
}) => {
    const onDrop = useCallback(
        (acceptedFiles: any, fileRejections: string | any[]) => {
            // Procesa los archivos aceptados
            onModelsDrop(acceptedFiles);
            console.log('Archivos aceptados: ', acceptedFiles);

            // Muestra una alerta si hay archivos rechazados
            if (fileRejections.length > 0) {
                alert('Solo se pueden subir archivos en formato .stl');
            }
        },
        [onModelsDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'model/stl': ['.stl'] }, // Solo acepta archivos .stl
        multiple: multipleFiles,
    });

    const dragActiveMessage: string = !multipleFiles
        ? 'Suelta tu archivo aquí...'
        : 'Suelta tus archivos aquí...';
    const dragInactiveMessage: string = !multipleFiles
        ? 'Arrastra y suelta tu archivo o haz click para importarlo...'
        : 'Arrastra y suelta tus archivos o haz click para importarlos...';

    // Establecer estilos dinámicamente usando el atributo style
    const customStyle = {
        width: `${size.width}px`, // Uso de template literals para asignar el ancho
        height: `${size.height}px`, // y el alto dinámicamente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed',
        borderColor: isDragActive ? '#9F7AEA' : 'white',
        backgroundColor: isDragActive ? '#6B46C1' : 'transparent',
        color: 'white',
    };

    return (
        <div
            {...getRootProps({
                style: customStyle, // Establecer los estilos dinámicamente
                //   className: `flex w-[${size.width}px] h-[${size.height}px] justify-center items-center text-white border-2 border-dashed ${
                //     isDragActive ? "border-violet-400 bg-violet-700" : "border-gray-300"
                //   }`
            })}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className='text-xl font-bold text-white'>{dragActiveMessage}</p>
            ) : (
                <div className='flex flex-col items-center'>
                    <p className='text-xl font-bold'>{dragInactiveMessage}</p>
                    <p className='text-lg'>Solo archivos en formato STL</p>
                </div>
            )}
        </div>
    );
};

export default Dropzone;
