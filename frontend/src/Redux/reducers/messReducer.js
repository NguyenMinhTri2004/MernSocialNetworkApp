import {TYPES} from "../actions/messAction"

const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    firstLoad: false
}

const messReducer = (state = initialState, action) => {
    switch (action.type){
        case TYPES.ADD_USER:
            if(state.users.every(item => item._id !== action.payload._id)){
                return {
                    ...state,
                    users: [action.payload, ...state.users]
                };
            }
            return state;

        case TYPES.ADD_MESSAGE:
             return {
                ...state,
                data : [...state.data, action.payload],
                users : state.users.map(user => 
                user._id === action.payload.recipients || user._id === action.payload.sender
                ? {
                    ...user , 
                    text : action.payload.text , 
                    media : action.payload.media,
                    call : action.payload.call
                } 
                : user
                )
        } 
        
        case TYPES.GET_CONVERSATIONS:
            console.log(action.payload)
            return {
                ...state,
                users: action.payload.newArr,
                resultUsers: action.payload.result,
                firstLoad: true
         }

        case TYPES.GET_MESSAGES:
            return {
                ...state,
                data: action.payload.messages.reverse(),
                resultUsers : action.payload.result
            };

        case TYPES.DELETE_MESSAGES:
                return {
                    ...state,
                    data: action.payload.newData
                };  
        
        case TYPES.DELETE_CONVERSATION:
              return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
                data: []
            };
                
        case TYPES.CHECK_ONLINE_OFFLINE:
                return {
                    ...state,
                    users: state.users.map(user => 
                        action.payload.includes(user._id)
                        ? {...user, online: true}
                        : {...user, online: false}
                    )
                };

        default:

            return state;
    }
}

export default messReducer