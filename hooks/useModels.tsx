import {Models, Users} from "@prisma/client";

export const useModels = ()=>{
    const getModelById = async (id: string): Promise<Models> => {
        return (await fetch(`/api/models/getmodelbyid?id=${id}`)).json().then((res) => res.model)
    }

    const getAllModels = async(): Promise<Models[]> =>{
        return (await fetch(`/api/models/getallmodels`)).json()
    }

    const addModel = async (model: Models) => {
        return (await fetch(`/api/models/addmodel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
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