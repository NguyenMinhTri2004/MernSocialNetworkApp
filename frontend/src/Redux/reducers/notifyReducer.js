import {TYPES} from '../actions/notifyAction';

const initialState = {
    loading: false,
    data : [],
    sound : false
}

const notifyReducer = (state = initialState , action) => {
   switch (action.type) {
    
        case TYPES.GET_NOTIFIES :
            return {
                ...state,
                data : action.payload
            }
         
        case TYPES.CREATE_NOTIFY :
             return {
                    ...state,
                    data : [action.payload , ...state.data]
            }   
            
         case TYPES.REMOVE_NOTIFY :
             return {
                     ...state,
                     data : state.data.filter(item => (
                          item.id !== action.payload.id || item.url !== action.payload.url
                     ))
            } 
            
        case TYPES.UPDATE_NOTIFY :
            const newData = state.data.map(item => {
                return (
                    item.id === action.payload.id ? action.payload : item
                )
            })
            
            return {
               ...state,
               data : newData
               
          }  

        case TYPES.UPDATE_SOUND:
            return {
                ...state,
                sound: action.payload
            }

        case TYPES.DELETE_ALL_NOTIFIES:
             return {
                 ...state,
                data: action.payload
           }   

        default :
            return state
   }
}

export default notifyReducer