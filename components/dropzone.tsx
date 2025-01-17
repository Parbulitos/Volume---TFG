import { useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import Swal from 'sweetalert2';

interface DropzoneProps {
    multipleFiles: boolean;
    onModelsDrop: (files: File[]) => void; 
}

const Dropzone = ({ multipleFiles, onModelsDrop }: DropzoneProps) => {
    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            onModelsDrop(acceptedFiles);
            if (fileRejections.length > 0) {
                const rejectedFileNames = fileRejections.map(({ file }) => file.name).join('<br>');
                Swal.fire({
                    icon: 'warning',
                    title: 'Ups...',
                    html: `Algunos archivos no se pudieron subir:<br>${rejectedFileNames}`,
                });
            }
        },
        [onModelsDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'model/stl': ['.stl'] },
        multiple: multipleFiles,
    });

    const dragActiveMessage = multipleFiles
        ? 'Suelta tus archivos aquí...'
        : 'Suelta tu archivo aquí...';
    const dragInactiveMessage = multipleFiles
        ? 'Arrastra y suelta tus archivos o haz click para importarlos...'
        : 'Arrastra y suelta tu archivo o haz click para importarlo...';

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
                <p className="text-center text-xl font-bold">{dragActiveMessage}</p>
            ) : (
                <div className="flex flex-col items-center text-center">
                    <p className="text-xl font-bold">{dragInactiveMessage}</p>
                    <p className="text-lg">Solo archivos en formato STL</p>
                </div>
            )}
        </div>
    );
};

export default Dropzone;
