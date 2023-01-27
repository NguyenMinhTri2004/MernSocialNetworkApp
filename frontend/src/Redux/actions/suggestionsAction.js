import {getDataApi} from "../../Utils/fetchData"

export const TYPES = {
    LOADING: "LOADING_SUGGES",
    GET_USER : "GET_USERS_SUGGES"
}


export const getSuggestions = (token) => async (dispatch) => {
     try {

        dispatch({
            type : TYPES.LOADING, 
            payload : true
        })

        const res = await getDataApi('suggestionsUser', token)

        console.log(res)

        dispatch({
            type : TYPES.GET_USER, 
            payload : res.data
        })

        dispatch({
            type : TYPES.LOADING, 
            payload : false
        })

     }catch (err) {
            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response?.data.msg}
     
            })
     }
}