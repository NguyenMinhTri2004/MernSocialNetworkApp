import {postDataApi} from "../../Utils/fetchData"
import { getDataApi , patchDataApi  , deleteDataApi } from "../../Utils/fetchData"

export const TYPES = {
    GET_NOTIFIES : "GET_NOTIFIES",
    CREATE_NOTIFY : "CREATE_NOTIFY",
    REMOVE_NOTIFY : "REMOVE_NOTIFY",
    UPDATE_NOTIFY : "UPDATE_NOTIFY",
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}


export const getNotifies = (token) => async (dispatch) => {
    try {
       const res = await getDataApi('notifies', token)

       dispatch({
        type: TYPES.GET_NOTIFIES,
        payload: res.data.notifies

    })

    }catch (err) {
        dispatch({
            type: TYPES.NOTIFY,
            payload: {error : err.response.data.msg}
    
        })
    }
}

export const createNotify = ({msg , auth , socket}) => async (dispatch) => {
    try {
       const res = await postDataApi('notify', msg , auth.token)
       socket.emit('createNotify', {
              ...res.data.notify,
              user : {
                  username : auth.user.username,
                  avatar : auth.user.avatar
              }
       } )
       
    }catch (err) {
        dispatch({
            type: TYPES.NOTIFY,
            payload: {error : err.response.data.msg}
    
        })
    }
}


export const removeNotify = ({msg , auth , socket}) => async (dispatch) => {
    try {
       const res = await deleteDataApi(`notify/${msg.id}?url=${msg.url}` , auth.token)
       socket.emit('removeNotify' , msg)
       
    }catch (err) {
        dispatch({
            type: TYPES.NOTIFY,
            payload: {error : err.response.data.msg}
    
        })
    }
}

export const isReadNotify = ({msg, auth}) => async (dispatch) => {
    
    dispatch({type: TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}})
    try {
        await patchDataApi(`/isReadNotify/${msg._id}`, null, auth.token)
    } catch (err) {

        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
    
        })
    }
}

export const deleteAllNotifies = (token) => async (dispatch) => {
    dispatch({type: TYPES.DELETE_ALL_NOTIFIES, payload: []})
    try {
        await deleteDataApi('deleteAllNotify', token)
    } catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
    
        })
    }
}


