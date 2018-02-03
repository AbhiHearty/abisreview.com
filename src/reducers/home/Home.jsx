import { HOME,BANNER } from '../../actions/home/Home';

export default function reducer (state = {isRequestInProgress : true,isError:false,response:{}}, action){
    switch(action.type){
        case HOME+"_SUCCESS":
        case HOME+"_ERROR":
        case HOME+"_FETCHING":
        case BANNER+"_SUCCESS":
        case BANNER+"_ERROR":
        case BANNER+"_FETCHING":
            return Object.assign({}, action);
            break;
        default:
            return state;
    }
}