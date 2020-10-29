import {emailUpdate, passwordUpdate} from "./authActions";

const editProfile = (user, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {


    }
}


export const editUser = (user, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        emailUpdate(user.email);
        passwordUpdate(user.password);
        if (profile) editProfile(user, profile);

        if (user.isArtist) {
            return firestore.collection('users').doc(user.id).set({
                login: user.login,
                name: user.name,
                voivodeshipId: user.voivodeshipId,
                city: user.city,
                genresId: user.genresId,
                instrumentsId: user.instrumentsId,
                status: user.status,
                isArtist: true,
                isActive: true
            })
        } else {
            return firestore.collection('users').doc(user.uid).set({
                login: user.login,
                name: user.name,
                voivodeshipId: user.voivodeshipId,
                city: user.city,
                genresId: user.genresId,
                members: user.members,
                status: user.status,
                isArtist: false,
                isActive: true
            })
        }
    }
}
