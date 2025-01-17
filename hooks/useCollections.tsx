import {Collections, Comments} from "@prisma/client";


export const useComments = ()=>{
    const getCollectionById = async (id: string): Promise<Collections> => {
        return (await fetch(`/api/collections/getcollectionbyid?id=${id}`)).json().then((res) => res.method)
    }

    const getAllCollections = async(): Promise<Collections[]> =>{
        return (await fetch(`/api/collections/getallcollections`)).json()
    }

    const addCollection = async (collection: Collections) => {
        return (await fetch(`/api/collection/addcollection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(collection)
        }))
    }

    const deleteCollectionById = async (id: string)=>{
        return (await fetch(`/api/collection/deletecollectionbyid?id=${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })).json().then()
    }

    return {
        getCollectionById,
        getAllCollections,
        addCollection,
        deleteCollectionById,
    }
}