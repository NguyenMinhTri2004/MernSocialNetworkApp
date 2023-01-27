
import { postDataApi, getDataApi, deleteDataApi } from '../../Utils/fetchData'


export const TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE'
}


export const addMessage = ({msg, auth, socket}) => async (dispatch) =>{
    dispatch({type: TYPES.ADD_MESSAGE, payload: msg})

    const { _id, avatar, fullname, username } = auth.user
    socket.emit('addMessage', {...msg , user : {_id, avatar, fullname, username}})
    
    try {
        await postDataApi('message', msg, auth.token)
    } catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
 
        })
    }
 }


export const getConversations = ({auth}) => async (dispatch) => {
    try {
        const res = await getDataApi(`conversations`, auth.token)

        console.log(auth.user._id)

        console.log(res)

        
        let newArr = [];
        res.data.conversations.forEach(item => {
            item.recipients.forEach(cv => {
                if(cv._id !== auth.user._id){
                    newArr.push({...cv, text: item.text, media: item.media ,call : item.call})
                }
            })
        })

        

        dispatch({
            type: TYPES.GET_CONVERSATIONS, 
            payload: {newArr, result: res.data.result}
        })

    } catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
 
        })
    }
}

export const getMessages = ({auth, id}) => async (dispatch) => {
    try {
        const res = await getDataApi(`message/${id}`, auth.token)
        console.log(res)
        // const newData = {...res.data, messages: res.data.messages.reverse()}

        dispatch({type: TYPES.GET_MESSAGES, payload: res.data})
    } catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
 
        })
    }
}


export const deleteMessages = (msg, data, auth) => async (dispatch) => {

    console.log(msg._id)
    
    const newData = data.filter(item => item._id !== msg._id)

   
    dispatch({type: TYPES.DELETE_MESSAGES, payload: {newData, _id: msg.recipient}})
    try {
        await deleteDataApi(`message/${msg._id}`, auth.token)
    } catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
 
        })
    }
}

export const deleteConversation = ({auth, id}) => async (dispatch) => {
    dispatch({type: TYPES.DELETE_CONVERSATION, payload: id})
    try {
        await deleteDataApi(`conversation/${id}`, auth.token)
    } catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
 
        })
    }
}