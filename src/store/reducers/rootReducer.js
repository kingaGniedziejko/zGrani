import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import browseReducer from "./browseReducer";
import searchReducer from "./searchReducer";
import voivodeshipsReducer from "./voivodeshipsReducer";
import genresReducer from "./genresReducer";
import instrumentsReducer from "./instrumentsReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    browse: browseReducer,
    search: searchReducer,
    voivodeships: voivodeshipsReducer,
    genres: genresReducer,
    instruments: instrumentsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;