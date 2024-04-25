import {Comments} from "@prisma/client";


export const useComments = ()=>{
    const getCommentById = async (id: string): Promise<Comments> => {
        return (await fetch(`/api/comments/getcommentbyid?id=${id}`)).json().then((res) => res.method)
    }

    const getAllComments = async(): Promise<Comments[]> =>{
        return (await fetch(`/api/comments/getallcomments`)).json()
    }

    const addComment = async (model: Comments) => {
        return (await fetch(`/api/comments/addcomment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        }))
    }

    const deleteCommentById = async (id: string)=>{
        return (await fetch(`/api/comments/deletecommentbyid?id=${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })).json().then()
    }

    return {
        getCommentById,
        getAllComments,
        addComment,
        deleteCommentById,
    }
}