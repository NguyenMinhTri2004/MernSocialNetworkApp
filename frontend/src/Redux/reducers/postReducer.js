import { TYPES } from "../actions/postAction"

const initialState = {
    posts : [],
    loading : false, 
    result : 0,
    page : 1
}

const postReducer = (state = initialState , action) => {
    switch (action.type) {
        case TYPES.CREATE_POST :
            return {
                ...state,
                posts : [action.payload , ...state.posts ]
            }

        case TYPES.LOADING_POST :
             return {
                ...state,
                loading : action.payload
           }    


        case TYPES.GET_POSTS :
             return {
                ...state,
                posts : action.payload.posts,
                result : action.payload.result,
                page : action.payload.page
           }  
           
           
        case TYPES.UPDATE_POST :
            const newPosts = state.posts.map(post => {
                return (
                    post._id === action.payload._id ? action.payload : post
                )
            })
            return {
               ...state,
               posts : newPosts
               
          }  
          
        case TYPES.DELETE_POST :
            return {
               ...state,
               posts : state.posts.filter(post =>{
                return (
                   post._id !== action.payload._id 
                )
             })
               
          }   

        default:
            return state   
    }
}

export default postReducer