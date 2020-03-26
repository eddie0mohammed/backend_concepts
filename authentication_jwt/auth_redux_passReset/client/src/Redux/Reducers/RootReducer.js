

import {combineReducers} from 'redux';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer'

const rootReducer = combineReducers({

    auth: authReducer,
    error: errorReducer

});

export default rootReducer;