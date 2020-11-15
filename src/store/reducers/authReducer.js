const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            console.log("login error");
            return {
                ...state,
                authError: 'Niepoprawny email lub hasło'
            }
        case 'LOGIN_SUCCESS':
            console.log("login success");
            return {
                ...state,
                authError: null
            }
        case 'LOGOUT_SUCCESS':
            console.log("logout success");
            return state;
        case 'SIGNUP_SUCCESS':
            console.log("signup success");
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log("signup error");
            return {
                ...state,
                authError: action.err && action.err.message
            }
        case 'FORGET_PASSWORD_SUCCESS':
            console.log("forgot password success");
            return {
                ...state,
                forgotPasswordError: "",
                forgotPasswordAwaitMessage: "Link resetujący hasło został wysłany na podany adres email"
            }
        case 'FORGET_PASSWORD_ERROR':
            console.log("forgot password error");
            return {
                ...state,
                forgotPasswordError: "błędny email",
                forgotPasswordAwaitMessage: ""
            }
        case 'EMAIL_VERIFICATION_SUCCESS':
            console.log("email verification success");
            return {
                ...state,
                isVerificationEmailSend: true
            }
        case 'EMAIL_VERIFICATION_ERROR':
            console.log("email verification success");
            return {
                ...state,
                isVerificationEmailSend: false
            }
        default:
            return state;
    }
}

export default authReducer;