import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
    multipleFiles: boolean;
    onModelsDrop: Function;
}

const Dropzone = ({multipleFiles, onModelsDrop,}: DropzoneProps) => {
    const onDrop = useCallback(
        (acceptedFiles: any, fileRejections: string | any[]) => {
            onModelsDrop(acceptedFiles);
            if (fileRejections.length > 0) {
                alert('Solo se pueden subir archivos en formato .stl');
            }
        },
        [onModelsDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'model/stl': ['.stl'] },
        multiple: multipleFiles,
    });

    const dragActiveMessage = !multipleFiles
        ? 'Suelta tu archivo aquí...'
        : 'Suelta tus archivos aquí...';
    const dragInactiveMessage = !multipleFiles
        ? 'Arrastra y suelta tu archivo o haz click para importarlo...'
        : 'Arrastra y suelta tus archivos o haz click para importarlos...';

    return (
        <div
            {...getRootProps({
                style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px dashed',
                    borderColor: isDragActive ? '#9F7AEA' : 'white',
                    backgroundColor: isDragActive ? '#6B46C1' : 'transparent',
                    color: 'white',
                    width: '90%', // Hacer que ocupe todo el ancho disponible
                    minHeight: '200px', // Establecer una altura mínima
                    padding: '20px', // Agregar algo de padding
                },
            })}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className='text-xl font-bold text-white text-center'>{dragActiveMessage}</p>
            ) : (
                <div className='flex flex-col items-center text-center'>
                    <p className='text-xl font-bold'>{dragInactiveMessage}</p>
                    <p className='text-lg'>Solo archivos en formato STL</p>
                </div>
            )}
        </div>
    );
};

export default Dropzone;
