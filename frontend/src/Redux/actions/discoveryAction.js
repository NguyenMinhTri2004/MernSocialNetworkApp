import {getDataApi} from "../../Utils/fetchData"


export const TYPES = {
    LOADING: "LOADING_DISCOVER",
    GET_POSTS : "GET_DISCOVER_POST",
    UPDATE_POST : "UPDATE_DISCOVER_POST"
}

export const getDiscoverPosts = (token) => async (dispatch) => {
    try {
        dispatch({
            type:  TYPES.LOADING,
            payload: true

        })

        const res = await getDataApi(`post_discover` , token)

        console.log(res)

        dispatch({
            type:  TYPES.GET_POSTS,
            payload: res.data

        })

        dispatch({
            type:  TYPES.LOADING,
            payload: false

        })

    }catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}

        })
    }
}