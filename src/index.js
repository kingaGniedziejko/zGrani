import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux"
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance, reduxFirestore, getFirestore } from "redux-firestore";
import firebase from "firebase/app";
import 'firebase/database';
import firebaseConfig from "./firebaseConfig";

import Loader from "./resources/images/loader.svg";

const store = createStore(rootReducer,
    compose (
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebaseConfig)
    )
);

const rrfConfig = {
    userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
    userProfile: 'users',
    presence: 'presence',
    sessions: 'sessions'
}

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) {
        return (
            <div className={"fullscreen d-flex flex-row align-items-center justify-content-center"}>
                <object type="image/svg+xml" data={Loader}>svg-animation</object>
            </div>
        );
    }

    return children
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App/>
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root'));

