import {combineReducers} from 'redux';

import reducer from './Reducer';
// import authReducer from './authReducer';

export default combineReducers({
    root: reducer,
    // auth: authReducer,
});
