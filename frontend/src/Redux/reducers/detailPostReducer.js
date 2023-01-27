import {TYPES} from "../actions/postAction"

const initialState = []

const detailPostReducer = (state = initialState , action) => {
    switch (action.type) {
        case TYPES.GET_POST :
           return [...state , action.payload]

        default :
            return state  
    }
}


export default detailPostReducer