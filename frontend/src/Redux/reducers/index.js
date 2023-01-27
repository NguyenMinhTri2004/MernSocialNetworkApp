import {combineReducers} from "redux";
import authReducer from "./authReducer";
import notifyReducer from "./notifyReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import detailPostReducer from "./detailPostReducer";
import discoveryReducer from "./discoveryReducer";
import suggestionsReducer from "./suggestionsReducer";
import socketReducer from "./socketReducer";
import alertReducer from "./alertReducer";
import messReducer from "./messReducer";
import statusReducer from "./statusReducer";
import callReducer from "./callReducer";
import peerReducer from "./peerReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
    authReducer,
    notifyReducer,
    profileReducer,
    postReducer,
    detailPostReducer,
    discoveryReducer,
    suggestionsReducer,
    socketReducer,
    alertReducer,
    messReducer,
    statusReducer,
    callReducer,
    peerReducer,
    themeReducer
})