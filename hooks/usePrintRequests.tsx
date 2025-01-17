import {Comments, PrintRequests} from "@prisma/client";


export const useCourses = ()=>{
    const getCourseById = async (id: string): Promise<PrintRequests> => {
        return (await fetch(`/api/printrequests/getprintrequestbyid?id=${id}`)).json().then((res) => res.method)
    }

    const getAllCourses = async(): Promise<PrintRequests[]> =>{
        return (await fetch(`/api/printrequests/getallprintrequests`)).json()
    }

    const addCourse = async (printRequest: PrintRequests) => {
        return (await fetch(`/api/printrequests/addprintrequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(printRequest)
        }))
    }

    const deleteCourseById = async (id: string)=>{
        return (await fetch(`/api/printrequests/deleteprintrequestbyid?id=${id}`,{
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