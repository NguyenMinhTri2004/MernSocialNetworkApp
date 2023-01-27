import {TYPES} from '../actions/profileAction'

const initialState = {
    loading: false,
    users : [],
    userposts : [],
    ids : [],
}


const profileReducer = (state = initialState , action) => {
     switch (action.type){
          case TYPES.LOADING :
              return {
                 ...state,
                 loading: action.payload
              };

           case TYPES.GET_USER :
            
               const newArr = state.users.filter(user => user._id !== action.payload.user._id)
               return {
                  ...state,
                  users : [...newArr, action.payload.user]
               }  

            case TYPES.FOLLOW :
               return {
                  ...state,
                  users : state.users.map(user => 
                     (user._id === action.payload._id ? action.payload : user))
               }

               
            case TYPES.UNFOLLOW :
               return {
                  ...state,
                  users : state.users.map(user => 
                     (user._id === action.payload._id ? action.payload : user))
               }

            case TYPES.GET_ID :
               return {
                     ...state,
                     ids : [...state.ids , action.payload]
               }
                     

            case TYPES.GET_POSTS :
               return {
                     ...state,
                     userposts : [...state.userposts , action.payload]
               }

            case TYPES.UPDATE_POST :
               const newPosts = state.userposts.map(post => {
                  return (
                      post._id === action.payload._id ? action.payload : post
                  )
              })
              return {
                 ...state,
                 userposts : newPosts
                 
            }      
                        
               
            default :
               return state   
     }
}

export default profileReducer