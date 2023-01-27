import {TYPES} from "../actions/discoveryAction"

const initialState = {
    loading: false,
    posts : [],
    result : 9,
    page : 3,
    firstLoad : false,
}


const discoveryReducer = (state = initialState , action) => {
    switch (action.type) {
        case TYPES.LOADING :
            return {
                ...state,
                loading : action.payload
            }

        case TYPES.GET_POSTS :
            return {
                    ...state,
                    posts : action.payload.posts, 
                    result : action.payload.result,
                    firstLoad : true

             }   


         case TYPES.UPDATE_POST :
            return {
                     ...state,
                     posts : action.payload.posts, 
                     result : action.payload.result,
                     page : state.page + 1
    
            }   
         

        default :
            return state    
    }
}


export default discoveryReducer