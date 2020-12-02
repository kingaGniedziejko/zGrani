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

export const signup = (newUser, newMembers) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage().ref();

        firebase.auth().createUserWithEmailAndPassword( newUser.email, newUser.password )
            .then((response) => {
                storage.child("default_user_picture.png").getDownloadURL().then((url) => {
                    if (newUser.isArtist){
                        firestore.collection('users').doc(response.user.uid).set({
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
                        firestore.collection('users').doc(response.user.uid).set({
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

                    newMembers.forEach(member => {
                        firestore.collection('users').doc(member).update({
                            bandsId: firestore.FieldValue.arrayUnion(response.user.uid)
                        })
                    })

                    const config = {
                        url: process.env.REACT_APP_SIGNUP_REDIRECT,
                        handleCodeInApp: true
                    }
                    firebase.auth().languageCode = 'pl';
                    response.user.sendEmailVerification(config)
                        .then(() => {
                            dispatch({ type: 'SIGNUP_SUCCESS' })
                        })
                        .catch(error => {
                            dispatch({ type: 'SIGNUP_ERROR', error })
                        })
                })
            })
            .catch(error => {
                dispatch({ type: 'SIGNUP_ERROR', error })
            })
    }
}

export const sendVerificationEmail = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        firebase.auth().languageCode = 'pl';

        const config = {
            url: process.env.REACT_APP_SIGNUP_REDIRECT,
            handleCodeInApp: true
        }

        user.sendEmailVerification(config)
            .then(() => {
                dispatch({type: 'EMAIL_VERIFICATION_SUCCESS'})
            })
            .catch(error => {
                dispatch({type: 'EMAIL_VERIFICATION_ERROR', error})
            })
    }
}

export const emailUpdate = (newEmail, firebase) => {
    const currentUser = firebase.auth().currentUser;

    if (newEmail !== currentUser.email) {
        currentUser.updateEmail(newEmail)
            .then(function () {
                return "";
            }).catch(function (error) {
                return error;
            });
    }
}

export const passwordUpdate = (newPassword, firebase) => {
    const currentUser = firebase.auth().currentUser;

    console.log("PASSWORD UPDATE");
    if (newPassword) {
        currentUser.updatePassword(newPassword).then(function () {
            return "";
        }).catch(function (error) {
            return error;
        });
    }
}

export const forgotPassword = (email) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        firebase.auth().languageCode = 'pl';

        firebase.auth().sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({ type: 'FORGET_PASSWORD_SUCCESS'});
            })
            .catch((error) => {
                dispatch({ type: 'FORGET_PASSWORD_ERROR', error });
            });
    }
}

export const reauthenticate = (credential) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const currentUser = firebase.auth().currentUser;

        const cred = firebase.auth.EmailAuthProvider.credential(credential.email, credential.password);

        currentUser.reauthenticateWithCredential(cred).then(function () {
            dispatch({ type: 'REAUTHENTICATE_SUCCESS' });
        }).catch(function (error) {
            dispatch({ type: 'REAUTHENTICATE_ERROR', error });
        });
    }
}
