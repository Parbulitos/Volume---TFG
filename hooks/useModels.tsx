import { supabaseClient } from '@/database/utils';
import { ModelItems, Models } from '@prisma/client';

export const useModels = () => {
    const getModelById = async (id: string): Promise<Models> => {
        return (await fetch(`/api/models/getmodelbyid?id=${id}`)).json().then((res) => res.model);
    };

    const getModelFileById = (userId: string, fileName: string) => {
        const dirName = fileName.split('.').reverse().pop();
        const { data } = supabaseClient.storage
            .from('ModelsBucket')
            .getPublicUrl(`${userId}/${dirName}/${fileName}`);
        // Verifica si se obtuvo la URL correctamente
        if (data && data.publicUrl) {
            // Crea un enlace temporal en el DOM
            const link = document.createElement('a');
            link.href = data.publicUrl;

            // Establece el atributo 'download' para indicar al navegador que descargue el archivo
            link.download = 'download'; // Puedes establecer el nombre de archivo deseado aquí

            // Haz clic en el enlace para iniciar la descarga
            link.click();
        }
    };

    const getAllModels = async (): Promise<Models[]> => {
        return (await fetch(`/api/models/getallmodels`)).json();
    };

    const addModel = async (model: Omit<Models, 'id'>, userId: string, file: File[]) => {
        const modelItemsToUpload = [];
        const newModel = await fetch(`/api/models/addmodel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model),
        });
        const responseModel = await newModel.json();
        for (const eachFile of file) {
            const { data, error } = await supabaseClient.storage
                .from('ModelsBucket')
                .upload(`${userId}/${model.name}/${eachFile.name}`, eachFile);
            if (error) {
                console.error(
                    `An error has occured. File: ${eachFile.name} could not be uploaded`,
                    error
                );
                throw error;
            }
            const uploadTime = new Date();
            const currentModelItem = {
                imgFileUrl: null,
                modelParentId: responseModel.model.id,
                modelUrl: data?.path,
                name: eachFile.name.split('.').reverse().pop(),
                uploadTime: uploadTime,
            };
            modelItemsToUpload.push(currentModelItem);
        }
        const uploadModelItemsRequest = await fetch(`/api/modelitems/addmultiplemodelitems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modelItemsToUpload),
        });
        const responseModelItems = await uploadModelItemsRequest.json();
        console.log(responseModelItems);
    };

    const deleteModelById = async (id: string) => {
        return (
            await fetch(`/api/models/deletemodelbyid?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        )
            .json()
            .then();
    };

    return {
        getModelById,
        getAllModels,
        addModel,
        getModelFileById,
    };
};
