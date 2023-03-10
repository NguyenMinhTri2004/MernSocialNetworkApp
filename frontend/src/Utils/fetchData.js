import axios from 'axios';
import { BASE_URL } from './config';

axios.defaults.baseURL = BASE_URL;

export const getDataApi = async (url , token ) => {
    const res = await axios.get(`/api/${url}` , {
        headers: {Authorization: token}
    })
   
    return res;
}


export const postDataApi = async (url , post , token ) => {
    const res = await axios.post(`/api/${url}` , post , {
        headers: {Authorization: token}
    })

    return res;
}


export const putDataApi = async (url , put , token ) => {
    const res = await axios.put(`/api/${url}` , put ,{
        headers: {Authorization: token}
    })

    return res;
}


export const patchDataApi = async (url , patch , token ) => {
    const res = await axios.patch(`/api/${url}` , patch , {
        headers: {Authorization: token}
    })

    return res;
}


export const deleteDataApi = async (url , token ) => {
    const res = await axios.delete(`/api/${url}` , {
        headers: {Authorization: token}
    })

    return res;
}