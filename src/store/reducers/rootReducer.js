import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore"

import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import browseReducer from "./browseReducer";
import searchReducer from "./searchReducer";
import voivodeshipsReducer from "./voivodeshipsReducer";
import genresReducer from "./genresReducer";
import instrumentsReducer from "./instrumentsReducer";


const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    browse: browseReducer,
    search: searchReducer,
    voivodeships: voivodeshipsReducer,
    genres: genresReducer,
    instruments: instrumentsReducer,
    firestore: firestoreReducer
})

export default rootReducer;