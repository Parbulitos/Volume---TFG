import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ fileNumber, onModelsDrop }: { fileNumber: number, onModelsDrop: Function }) => {
  const multipleFiles: boolean = fileNumber > 1;

  const onDrop = useCallback((acceptedFiles: any, fileRejections: string | any[]) => {
    // Procesa los archivos aceptados
    onModelsDrop(acceptedFiles);
    console.log("Archivos aceptados: ", acceptedFiles);
    
    // Muestra una alerta si hay archivos rechazados
    if (fileRejections.length > 0) {
      alert("Solo se pueden subir archivos en formato .stl");
    }
  }, [onModelsDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "model/stl": [".stl"] }, // Solo acepta archivos .stl
    multiple: multipleFiles
  });

  const dragActiveMessage: string = fileNumber === 1 ? "Suelta tu archivo aquí..." : "Suelta tus archivos aquí..."
  const dragInactiveMessage: string = fileNumber === 1 ? "Arrastra y suelta tu archivo o haz click para importarlo..." : "Arrastra y suelta tus archivos o haz click para importarlos..."

  return (
    <div
      {...getRootProps({
        className: `flex w-[700px] h-[100px] justify-center items-center border-2 border-dashed ${
          isDragActive ? "border-violet-400 bg-violet-700" : "border-gray-300"
        }`
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className='text-xl font-bold text-white'>{dragActiveMessage}</p>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">
            {dragInactiveMessage}
          </p>
          <p className="text-lg">Solo archivos en formato STL</p>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
