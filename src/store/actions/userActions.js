import {emailUpdate, passwordUpdate} from "./authActions";

const editProfile = (user, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {


    }
}


export const editUser = (auth, user, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        if (auth.email) emailUpdate(auth.email);
        if (auth.password) passwordUpdate(auth.password);
        if (profile) editProfile(auth, user, profile);

        if (user.isArtist) {
            return firestore.collection('users').doc(auth.id).set({
                ...user
                // login: user.login
                // name: user.name,
                // voivodeshipId: user.voivodeshipId,
                // city: user.city,
                // genresId: user.genresId,
                // instrumentsId: user.instrumentsId,
                // status: user.status
            }, { merge: true })
        } else {
            return firestore.collection('users').doc(auth.id).set({
                ...user
                // name: user.name,
                // voivodeshipId: user.voivodeshipId,
                // city: user.city,
                // genresId: user.genresId,
                // members: user.members,
                // status: user.status
            }, { merge: true })
        }
    }
}
