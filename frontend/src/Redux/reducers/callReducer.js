import {TYPES} from "../actions/callAction"

const initialState = null

const callReducer = (state = initialState , action) => {
    switch (action.type){
        case TYPES.CALL:
            return action.payload;
        default:
            return state;
    }
}


export default callReducer