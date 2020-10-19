// export const createUser = (user) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         // make async call to database
//         const firestore = getFirestore();
//
//         firestore.collection('users').add({
//             ...user,
//             signupDate: new Date(),
//             type: 'test'
//         })
//             .then(() => dispatch({ type: 'CREATE_USER', user }))
//             .catch((err) => dispatch({ type: 'CREATE_USER_ERROR', err }))
//
//     }
//
// }