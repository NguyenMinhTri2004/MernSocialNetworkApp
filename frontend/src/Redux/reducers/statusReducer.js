import {TYPES} from "../actions/statusAction"

const initialState = []

const statusReducer = (state = initialState , action) => {
    switch (action.type){
        case TYPES.ONLINE:
            return [...state, action.payload];
        case TYPES.OFFLINE:
            return state.filter(item => item !== action.payload)
        default:
            return state;
    }
}

export default statusReducer