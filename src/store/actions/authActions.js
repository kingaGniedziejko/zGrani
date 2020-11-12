import 'firebase/storage';

export const login = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((error) => {
            dispatch({ type: 'LOGIN_ERROR', error });
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
        const storage = firebase.storage().ref();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            storage.child("default_user_picture.png").getDownloadURL().then((url) => {
                if (newUser.isArtist){
                    return firestore.collection('users').doc(response.user.uid).set({
                        login: newUser.login,
                        email: newUser.email,
                        name: newUser.name,
                        voivodeshipId: newUser.voivodeshipId,
                        city: newUser.city,
                        genresId: newUser.genresId,
                        instrumentsId: newUser.instrumentsId,
                        status: newUser.status,
                        isArtist: true,
                        isActive: true,
                        imageUrl: url,
                        bandsId: []
                    })
                } else {
                    return firestore.collection('users').doc(response.user.uid).set({
                        login: newUser.login,
                        name: newUser.name,
                        voivodeshipId: newUser.voivodeshipId,
                        city: newUser.city,
                        genresId: newUser.genresId,
                        members: newUser.members,
                        status: newUser.status,
                        isArtist: false,
                        isActive: true,
                        imageUrl: url
                    })
                }
            })

        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(error => {
            dispatch({ type: 'SIGNUP_ERROR', error })
        })
    }
}

export const emailUpdate = (newEmail) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const currentUser = firebase.auth().currentUser;

        if (newEmail !== currentUser.email) {
            currentUser.updateEmail(newEmail)
                .then(function () {
                    dispatch({type: "EMAIL_UPDATE_SUCCESS"});
                }).catch(function (error) {
                    dispatch({type: "EMAIL_UPDATE_ERROR", error});
            });
        }
    }
}

export const passwordUpdate = (newPassword) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const currentUser = firebase.auth().currentUser;

        if (newPassword) {
            currentUser.updatePassword(newPassword).then(function () {
                dispatch({ type: "PASSWORD_UPDATE_SUCCESS"});
            }).catch(function (error) {
                dispatch({ type: "PASSWORD_UPDATE_ERROR", error});
            });
        }
    }
}

export const forgotPassword = (email) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        firebase.auth().sendPasswordResetEmail(email, config)
            .then(r => {
                dispatch({ type: 'FORGET_PASSWORD_SUCCESS'})
            })
            .catch((error) => {
                dispatch({ type: 'FORGET_PASSWORD_ERROR', error });
            });

        // firebase.auth().signInWithEmailAndPassword(
        //     credentials.email,
        //     credentials.password
        // ).then(() => {
        //     dispatch({ type: 'LOGIN_SUCCESS' });
        // }).catch((error) => {
        //     dispatch({ type: 'LOGIN_ERROR', error });
        // })
    }
}