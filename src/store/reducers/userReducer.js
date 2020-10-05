const initState = {};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            console.log('created user', action.user)
    }
    return state;
}

export default userReducer;