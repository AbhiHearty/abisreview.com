import RequestFactory from '../utility/requestFactory';
import Auth from '../utility/authorization';

if (!String.prototype.startsWith) {
 String.prototype.startsWith = function(searchString, position) {
   position = position || 0;
   return this.indexOf(searchString, position) === position;
 };
}
const asycMiddleWare = store => next => action => {
    if (action.type.startsWith('AJAX_')) {
        let prefixAction = action.type.split("AJAX_")[1];
        let tempAction = {
            type: prefixAction + '_FETCHING',
            isRequestInProgress: true,
            isError: false,
            action : prefixAction
        };
        next(tempAction);
        let data = (typeof action.payload.data === 'object') ? action.payload.data : {};
        let queryParams = (typeof action.payload.queryParams === 'object') ? action.payload.queryParams : null;
        let cache = (typeof action.payload.cache === 'number') ? action.payload.cache : 0;
        RequestFactory.withService((action.payload.service)?action.payload.service:'BASE_API').call(action.payload.type, action.payload.url, data, (response) => {
           if(response.statuscode === 401 && prefixAction!=='LOGIN'){
                store.dispatch({
                    type: 'LOGOUT',
                    isRequestInProgress: false,
                    isError: false
                });
            }else{
                let successAction = {
                    type: prefixAction + '_SUCCESS',
                    isRequestInProgress: false,
                    response: response,
                    isError: false,
                    action : prefixAction
                };
                store.dispatch(successAction);                
            }
        }, (response) => {
            let errorAction = {
                type: prefixAction + '_ERROR',
                isRequestInProgress: false,
                isError: true,
                response: response,
                action : prefixAction
            };
            store.dispatch(errorAction);
        },queryParams,cache);
    } else {
        next(action);
    }
}
export default asycMiddleWare;