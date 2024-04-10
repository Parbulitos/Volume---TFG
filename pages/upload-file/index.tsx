import Dropzone from '@/components/dropzone';
import React from 'react';

const UploadFile = () => {
    return (
        <div className='flex flex-col items-center mt-5 w-full'>
            <Dropzone
                multipleFiles={true}
                onModelsDrop={() => {}}
                size={{ width: 1000, height: 200 }}
            />

            <h2 className='text-white text-3xl font-bold mt-6 font'>Información Requerida</h2>
            <div className='grid grid-cols-2 items-center w-[1000px] mt-3 gap-x-16 gap-y-5'>
                <input
                    type='text'
                    placeholder='Nombre del modelo'
                    className='input input-bordered'
                />
                <select className='select select-bordered'>
                    <option disabled selected>
                        Categoría
                    </option>
                    <option>Cat 1</option>
                    <option>Cat 2</option>
                    <option>Cat 3</option>
                    <option>Cat 4</option>
                    <option>Cat 5</option>
                </select>
                <input
                    type='text'
                    placeholder='Tags'
                    className='input input-bordered'
                />
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
            </div>
        </div>
    );
};

export default UploadFile;
