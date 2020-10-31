import {emailUpdate, passwordUpdate} from "./authActions";
import { v1 as uuidv1 } from 'uuid';

const editProfile = (user, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

    }
}


export const editUser = (auth, user, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage().ref();

        if (auth.email) emailUpdate(auth.email);
        if (auth.password) passwordUpdate(auth.password);
        if (profile) editProfile(auth, user, profile);

        if (profile.imageUrl) {
            storage.child("user/" + uuidv1()).put(profile.imageUrl)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                        .then(url => {
                            firestore.collection('users').doc(auth.id).set({
                                imageUrl: url
                            }, { merge: true })
                        });
                })
        }

        return firestore.collection('users').doc(auth.id).set({
            ...user
        }, { merge: true })
    }
}
