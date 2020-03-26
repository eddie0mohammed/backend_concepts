
import axios from 'axios';

import * as actionTypes from './ActionTypes';



export const register = (username, email, password) => async (dispatch) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({username, email, password});

        const res = await axios.post('http://localhost:8080/auth/register', body, config);
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data
        });
        

    }catch(err){
        console.log(err);
        // dispatch err
        dispatch({
            type: actionTypes.REGISTER_ERROR
        });

    }
    
    
}

export const resetRegisteredStatus = () => {
    return {
        type: actionTypes.RESET_REGISTER_STATUS
    }
}


export const login = (email, password) => async (dispatch) => {
    
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({email, password});

        const res = await axios.post('http://localhost:8080/auth/login', body, config);
        // console.log(res.data);
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: res.data
        });

    }catch(err){
        console.log(err);
        //dispatch err
        dispatch({
            type: actionTypes.LOGIN_ERROR,
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);
    }
}


export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}



export const getCurrentUser = (token) => async (dispatch) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (token){
            config.headers['auth-token'] = token;
        }

        const res = await axios.get('http://localhost:8080/auth', config);
        console.log(res.data);
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            payload: res.data
        });

    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.NO_USER_LOGGED
        });
    }


}



export const forgotPassword = (email) => async (dispatch) => {

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({email: email});

        const res = await axios.post('http://localhost:8080/auth/forgotPassword', body, config);
        console.log(res.data);

        dispatch({
            type: actionTypes.FORGOT_PASSWORD
        });



    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR
        });

        setTimeout(() => {
            dispatch({type: actionTypes.CLEAR_ERRORS});
        }, 3000)
    }
}

export const resetForgotPassword = () => {
    return {
        type: actionTypes.RESET_FORGOT_PASSWORD_STATUS
    }
}

export const showError = () => {
    return {
        type: actionTypes.SHOW_ERROR
    }
}

export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERRORS
    }
}


export const resetPassword = (password, token) => async (dispatch) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({password: password});

        const res = await axios.post(`http://localhost:8080/auth/resetPassword/${token}`, body, config);
        console.log(res.data);

        dispatch({
            type: actionTypes.RESET_PASSWORD
        })

    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR
        })
    }
}

export const resetResetPasswordStatus = () => {
    return {
        type: actionTypes.RESET_RESET_PASSWORD_STATUS
    }
}