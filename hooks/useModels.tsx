import { supabaseClient } from '@/database/utils';
import { ModelItems, Models } from '@prisma/client';
import JSZip from 'jszip';

export const useModels = () => {
    const getModelById = async (id: string): Promise<Models> => {
        return (await fetch(`/api/models/getmodelbyid?id=${id}`)).json().then((res) => res.model);
    };

    const getModelFileById = async (modelId: string) => {
        //const dirName = fileName.split('.').reverse().pop();
        const model: Models = await getModelById(modelId);
        const modelItemsResponse = await fetch(
            `/api/modelitems/getmodelitemsbyparentid?modelparentid=${model.id}`
        );
        const response = await modelItemsResponse.json();
        const modelItems = response.modelItems as ModelItems[];
        if (modelItems.length === 1) {
            const modelRetrieved = await supabaseClient.storage
                .from('ModelsBucket')
                .download(`${modelItems[0].modelUrl}?download`)
                .then((res) => res);
            const link = document.createElement('a');
            if (modelRetrieved.data) {
                link.href = URL.createObjectURL(modelRetrieved.data);
                link.download = `${model.name}.stl`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } else if (modelItems.length > 1) {
            const modelItemsFiles = modelItems.map(async (modelItem) => {
                const promise = await supabaseClient.storage
                    .from('ModelsBucket')
                    .download(`${modelItem.modelUrl}?download`)
                    .then((res) => res);
                return promise.data;
            });
            const zip = new JSZip();
            modelItemsFiles.forEach((each, index) => {
                // @ts-ignore
                zip.file(`${modelItems[index].name}.stl`, each, { binary: true });
            });
            zip.generateAsync({ type: 'blob' }).then(function (content) {
                // Usa FileSaver.js u otra técnica para guardar el archivo ZIP
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = `${model.name}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    };

    const getModelItemFileUrlById = async (modelItemId: string) => {
        const modelItem = await fetch(
            `/api/modelitems/getmodelitembyid?modelitemid=${modelItemId}`
        );
        return await modelItem.json();
    };

    const getModelItemsByParentId = async (modelParentId: string) => {
        const model: Models = await getModelById(modelParentId);
        const modelItemsResponse = await fetch(
            `/api/modelitems/getmodelitemsbyparentid?modelparentid=${model.id}`
        );
        const response = await modelItemsResponse.json();
        return response.modelItems as ModelItems[];
    }

    const getModelItemFileById = async (modelItemId: string) => {
        const modelItem = await fetch(`/api/modelitems/getmodelitem?modelitemid=${modelItemId}`);
        const response = await modelItem.json();
        const modelItemRetrieved = await supabaseClient.storage
            .from('ModelsBucket')
            .download(`${response.modelItem.path}?download`)
            .then((res) => res);
        const link = document.createElement('a');
        if (modelItemRetrieved.data) {
            link.href = URL.createObjectURL(modelItemRetrieved.data);
            link.download = `${response.modelItem.name}.stl`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
        await fetch(`/api/modelitems/addmultiplemodelitems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modelItemsToUpload),
        });
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

    const getCatalogModels = async (amount: number, category?: string, filter?: string) => {
        return await fetch(`/api/catalog/getcatalogmodels?amount=${amount}`)
            .then((res) => res.json())
            .then((res) => res.models);
    };

    const getModelsByUserId = async (userId: string) => {
        return await fetch(`/api/models/getmodelsbyuserid?userid=${userId}`)
            .then((res) => res.json())
            .then((res) => res.models);
    };

    return {
        getModelById,
        getAllModels,
        addModel,
        getModelFileById,
        getModelItemFileById,
        getCatalogModels,
        getModelsByUserId,
        getModelItemFileUrlById,
        getModelItemsByParentId
    };
};
