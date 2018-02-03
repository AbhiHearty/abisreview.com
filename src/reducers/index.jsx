import {combineReducers} from 'redux';
import Home from './home/Home';

const rootReducer = combineReducers({
    home: Home,
})

export default rootReducer
