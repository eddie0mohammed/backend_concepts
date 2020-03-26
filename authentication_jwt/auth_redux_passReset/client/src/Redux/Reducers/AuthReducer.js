

import * as actionTypes from '../Actions/ActionTypes';



const initialState = {

    registered: false,
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: null,
    forgetPassword: false,
    passwordReset: false

}

const authReducer = (state = initialState, action) => {

    switch(action.type){

        case(actionTypes.REGISTER_SUCCESS):
            return {
                ...state,
                registered: true
            }
        
        case(actionTypes.RESET_REGISTER_STATUS):
            return {
                ...state,
                registered: false
            }

        case (actionTypes.LOGIN_SUCCESS):
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.data.user
            }

        case (actionTypes.LOGOUT):
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null
            }

        case (actionTypes.GET_CURRENT_USER):
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.data.user

            }

        case (actionTypes.NO_USER_LOGGED):
            return {
                ...state,
                isAuthenticated:false,
                user:null,
                token:null
            }
        
        case (actionTypes.FORGOT_PASSWORD):
            return {
                ...state,
                forgetPassword: true

            }
        
        case (actionTypes.RESET_FORGOT_PASSWORD_STATUS):
            return {
                ...state,
                forgetPassword: false
            }
        
        case (actionTypes.RESET_PASSWORD):
            return {
                ...state,
                passwordReset: true
            }

        case (actionTypes.RESET_RESET_PASSWORD_STATUS):
            return {
                ...state,
                passwordReset: false
            }
        

        default:
            return state;
    }
}


export default authReducer;