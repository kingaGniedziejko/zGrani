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
                    voivodeshipId: newUser.voivodeshipId,
                    city: newUser.city,
                    genresId: newUser.genresId,
                    instrumentsId: newUser.instrumentsId,
                    statusId: newUser.statusId,
                    isArtist: true,
                    isActive: true
                })
            } else {
                return firestore.collection('users').doc(response.user.uid).set({
                    name: newUser.name,
                    voivodeshipId: newUser.voivodeshipId,
                    city: newUser.city,
                    genresId: newUser.genresId,
                    // members: newUser.members
                    statusId: newUser.statusId,
                    isArtist: false,
                    isActive: true
                })
            }
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}