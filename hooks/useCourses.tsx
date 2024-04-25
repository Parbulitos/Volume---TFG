import {Comments} from "@prisma/client";


export const useCourses = ()=>{
    const getCourseById = async (id: string): Promise<Comments> => {
        return (await fetch(`/api/courses/getcoursebyid?id=${id}`)).json().then((res) => res.method)
    }

    const getAllCourses = async(): Promise<Comments[]> =>{
        return (await fetch(`/api/courses/getallcourses`)).json()
    }

    const addCourse = async (model: Comments) => {
        return (await fetch(`/api/courses/addcourse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        }))
    }

    const deleteCourseById = async (id: string)=>{
        return (await fetch(`/api/courses/deletecoursesbyid?id=${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })).json().then()
    }

    return {
        getCourseById,
        getAllCourses,
        addCourse,
        deleteCourseById,
    }
}