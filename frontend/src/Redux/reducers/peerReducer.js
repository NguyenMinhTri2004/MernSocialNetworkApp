import { TYPES } from '../actions/peerAction'

const initialState = null

const peerReducer = (state = initialState , action) => {
    switch (action.type){
        case TYPES.PEER:
            return action.payload;
        default:
            return state;
    }
}


export default peerReducer