import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import browseReducer from "./browseReducer";
import searchReducer from "./searchReducer";
import genresReducer from "./genresReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore"

const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    browse: browseReducer,
    search: searchReducer,
    genres: genresReducer,
    firestore: firestoreReducer
})

export default rootReducer;