import { createClient } from '@/database/utils';
import { Models } from '@prisma/client';

export const useModels = ()=>{
    const supabase = createClient()

    const getModelById = async (id: string): Promise<Models> => {
        return (await fetch(`/api/models/getmodelbyid?id=${id}`)).json().then((res) => res.model)
    }

    const getModelFileById = (userId: string, fileName: string)=>{
        const dirName = fileName.split('.').reverse().pop()
        const { data } = supabase.storage.from('ModelsBucket').getPublicUrl(`${userId}/${dirName}/${fileName}`)
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
    }

    const getAllModels = async(): Promise<Models[]> =>{
        return (await fetch(`/api/models/getallmodels`)).json()
    }

    const addModel = async (model: Omit<Models, "id">, userId: string, file: File) => {
        const dirName = file.name.split('.').reverse().pop()
        const { data, error } = await supabase.storage.from('ModelsBucket').upload(`${userId}/${dirName}/${file.name}`, file)
        if (error) {
            console.error('An error has occured no model was uploaded: ', error)
            throw error
        }
        const newModel = {...model, fileUrl: data?.path}
        console.log(data?.path)
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
        addModel,
        getModelFileById
    }
}