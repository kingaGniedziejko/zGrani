export const createUser = (user) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({type: 'CREATE_USER', user});
    }

}