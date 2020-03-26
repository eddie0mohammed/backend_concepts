
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    error: ''
}

const errorReducer = (state = initialState, action) => {
    

    switch(action.type){

        case(actionTypes.REGISTER_ERROR):
            return{
                ...state,
                error: 'Registration failed'
            }

        case (actionTypes.LOGIN_ERROR):
            return{
                ...state,
                error: 'Login failed. Invalid Credentials'
            }

        case (actionTypes.CLEAR_ERRORS):
            return {
                ...state,
                error: ''
            }
        
        case (actionTypes.ERR):
            return {
                ...state,
                error: 'Error'
            }
            
        case (actionTypes.SHOW_ERROR):
            return {
                ...state,
                error: "Passwords don't match"
            }


        default:
            return state;
    }
}

export default errorReducer;