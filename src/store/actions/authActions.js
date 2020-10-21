export const login = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        })
    }
}

export const logout = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: 'LOGOUT_SUCCESS' });
            })
    }
}

export const signup = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            if (newUser.isArtist){
                return firestore.collection('users').doc(response.user.uid).set({
                    name: newUser.name,
                    voivodeship: newUser.voivodeship,
                    city: newUser.city,
                    isArtist: true,
                    isActive: true,
                    genres: newUser.genres,
                    instruments: newUser.instruments,
                })
            } else {
                return firestore.collection('users').doc(response.user.uid).set({
                    name: newUser.name,
                    voivodeship: newUser.voivodeship,
                    city: newUser.city,
                    isArtist: false,
                    isActive: true,
                    genres: newUser.genres,
                    // members: newUser.members
                })
            }
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })

    }
}