import { createClient } from '@/database/utils';
import { Models } from '@prisma/client';

export const useModels = ()=>{
    const getModelById = async (id: string): Promise<Models> => {
        return (await fetch(`/api/models/getmodelbyid?id=${id}`)).json().then((res) => res.model)
    }

    const getAllModels = async(): Promise<Models[]> =>{
        return (await fetch(`/api/models/getallmodels`)).json()
    }

    const addModel = async (model: Models, userId: string, file: File) => {
        const supabase = createClient()
        const { data, error } = await supabase.storage.from('ModelsBucket').upload(`${userId}/${file.name}`, file)
        if (error) {
            console.error('An error has occured no model was uploaded: ', error)
            throw error
        }
        const newModel: Models = {...model, fileUrl: data?.path}
        return (await fetch(`/api/models/addmodel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newModel)
        }))
    }

    const deleteModelById = async (id: string)=>{
        return (await fetch(`/api/models/deletemodelbyid?id=${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })).json().then()
    }

    return {
        getModelById,
        getAllModels,
        addModel
    }
}