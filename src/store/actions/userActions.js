import {emailUpdate, passwordUpdate} from "./authActions";
import { v1 as uuidv1 } from 'uuid';

export const editUser = (auth, user, userPhoto, newMembers, profile) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage().ref();

        console.log(auth.password);
        if (auth.email) emailUpdate(auth.email, firebase);
        if (auth.password) passwordUpdate(auth.password, firebase);

        if (auth.hasProfile){
            if (profile) editProfile(auth, profile, firebase, firestore, storage);
        } else
            if (profile) createProfile(auth, profile, firebase, firestore, storage);

        if (userPhoto.defaultImage){
            storage.child("default_user_picture.png").getDownloadURL().then((url) => {
                firestore.collection('users').doc(auth.id).set({
                    imageUrl: url
                }, { merge: true })
            })
        } else {
            putSingleImage(userPhoto.image, firestore, storage, "user/", "users", auth.id, "imageUrl");
        }
        deleteItemFromStorage(userPhoto.imageUrlDeleted, firebase, storage);

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

const createProfile = (auth, profile, firebase, firestore, storage) => {
    firestore.collection('users').add({
        userId: auth.id,
        facebookLink: profile.facebookLink,
        youtubeLink: profile.youtubeLink,
        instagramLink: profile.instagramLink,
        soundcloudLink: profile.soundcloudLink,
        websiteLink: profile.websiteLink,
        description: profile.description,
        imageGallery: [],
        recordings: [],
        videoLink: profile.videoLink
    }).then( docRef => {
        profile.galleryNew.forEach( image => {
            putImageToArray(image, firestore, storage, "profile/gallery/", "users", docRef.id, "imageGallery");
        })

        profile.galleryDeleted.forEach( imageUrl => {
            deleteItemFromStorage(imageUrl, firebase, storage);
        })

        profile.recordingsNew.forEach( recording => {
            putImageToArray(recording, firestore, storage, "profile/recordings/", "users", docRef.id, "recordings");
        })

        profile.recordingsDeleted.forEach( recordingUrl => {
            deleteItemFromStorage(recordingUrl, firebase, storage);
        })
    })
}

const editProfile = (auth, profile, firebase, firestore, storage) => {
    firestore.collection('users').doc(profile.id).set({
        facebookLink: profile.facebookLink,
        youtubeLink: profile.youtubeLink,
        instagramLink: profile.instagramLink,
        soundcloudLink: profile.soundcloudLink,
        websiteLink: profile.websiteLink,
        description: profile.description,
        imageGallery: profile.gallerySrc,
        recordings: profile.recordingsSrc,
        videoLink: profile.videoLink
    }, { merge: true })
        .then(() => {
            profile.galleryNew.forEach( image => {
                putImageToArray(image, firestore, storage, "profile/gallery/", "users", profile.id, "imageGallery");
            })

            profile.galleryDeleted.forEach( imageUrl => {
                deleteItemFromStorage(imageUrl, firebase, storage);
            })

            profile.recordingsNew.forEach( recording => {
                putImageToArray(recording, firestore, storage, "profile/recordings/", "users", profile.id, "recordings");
            })

            profile.recordingsDeleted.forEach( recordingUrl => {
                deleteItemFromStorage(recordingUrl, firebase, storage);
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

const deleteItemFromStorage = (deletedItemUrl, firebase, storage) => {
    if (deletedItemUrl) {
        let deletedRef = firebase.storage().refFromURL(deletedItemUrl);
        storage.child("default_user_picture.png").getDownloadURL().then((url) => {
            if (url !== deletedItemUrl) {
                deletedRef.delete().then(function () {
                    console.log("usunięto pomyślnie")
                }).catch(function (error) {
                    console.log("Błąd usuwania")
                });
            }
        })


    }
}
