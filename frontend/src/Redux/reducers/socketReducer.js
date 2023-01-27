import {TYPES} from "../actions/socketAction"

const initialState = []

const socketReducer = (state = initialState , action) => {
     switch (action.type) {
        case TYPES.SOCKET :
            return action.payload;
        default :
            return state;    
     }
}

export default socketReducer