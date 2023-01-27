
import {TYPES} from '../actions/themeAction';

const initialState = {
    mode : 'Light'
}

const themeReducer = (state = initialState , action) => {
   switch (action.type) {
    
        case TYPES.Dark :
            return {
                ...state,
                mode : 'Dark'
            }

        case TYPES.Light :
            return {
                ...state,
                mode : 'Light'
            }
    

        default :
            return state
   }
}

export default themeReducer