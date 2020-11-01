import {emailUpdate, passwordUpdate} from "./authActions";
import { v1 as uuidv1 } from 'uuid';

export const editUser = (auth, user, userPhoto, newMembers, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage().ref();

        if (auth.email) emailUpdate(auth.email);
        if (auth.password) passwordUpdate(auth.password);

        if (auth.hasProfile){
            if (profile) editProfile(auth, profile, firestore, storage);
        } else
            if (profile) createProfile(auth, profile, firestore, storage);


        putSingleImage(userPhoto.image, firestore, storage, "user/", "users", auth.id, "imageUrl");
        deleteItemFromStorage(userPhoto.imageUrlDeleted, storage);

        newMembers.forEach(member => {
            firestore.collection('users').doc(member).update({
                bandsId: firestore.FieldValue.arrayUnion(auth.id)
            })
        })


        return firestore.collection('users').doc(auth.id).set({
            ...user
        }, { merge: true })
    }
}

const createProfile = (auth, profile, firestore, storage) => {
    firestore.collection('profiles').add({
        userId: auth.id,
        description: profile.description,
        gallery: []
    }).then( docRef => {
        putSingleImage(profile.profileBackground, firestore, storage, "profile/background/", "profiles", docRef.id, "backgroundImageUrl");
        deleteItemFromStorage(profile.imageUrlDeleted, storage);

        profile.galleryNew.forEach( image => {
            putImageToArray(image, firestore, storage, "profile/gallery/", "profiles", docRef.id, "imageGallery");
        })

        profile.galleryDeleted.forEach( imageUrl => {
            deleteItemFromStorage(imageUrl, storage);
        })
    })
}

const editProfile = (auth, profile, firestore, storage) => {
    firestore.collection('profiles').doc(profile.id).set({
        description: profile.description,
        gallery: profile.gallerySrc
    }, { merge: true })
        .then(() => {
            putSingleImage(profile.profileBackground, firestore, storage, "profile/background/", "profiles", profile.id, "backgroundImageUrl");
            deleteItemFromStorage(profile.imageUrlDeleted, storage);

            profile.galleryNew.forEach( image => {
                putImageToArray(image, firestore, storage, "profile/gallery/", "profiles", profile.id, "imageGallery");
            })

            profile.galleryDeleted.forEach( imageUrl => {
                deleteItemFromStorage(imageUrl, storage);
            })
        })
}

const putSingleImage = (image, firestore, storage, storagePath, collection, id, field) => {
    if (image) {
        storage.child(storagePath + uuidv1()).put(image)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL()
                    .then(url => {
                        firestore.collection(collection).doc(id).set({
                            [field]: url
                        }, {merge: true})
                    });
            })
    }
}

const putImageToArray = (image, firestore, storage, storagePath, collection, id, field) => {
    if (image) {
        storage.child(storagePath + uuidv1()).put(image)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL()
                    .then(url => {
                        firestore.collection(collection).doc(id).update({
                            [field]: firestore.FieldValue.arrayUnion(url)
                        })
                    });
            })
    }
}

const deleteItemFromStorage = (deletedItemUrl, storage) => {
    if (deletedItemUrl) {
        let deletedRef = storage.refFromURL(deletedItemUrl);

        if (deletedRef !== storage.child("default_user_picture.png")) {
            deletedRef.delete().then(function () {
                console.log("usunięto pomyślnie")
            }).catch(function (error) {
                console.log("Błąd usuwania")
            });
        }
    }
}
