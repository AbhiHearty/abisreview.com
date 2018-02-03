import jQuery from 'jquery';
import Authorization from '../utility/authorization';
import Utility from './Utility';

class RequestFactory {
    /**
    * static class property to hold various service avaliable
    *
    * @var array
    */    
    static BASE_API = 'sass_api';
    /**
    * static class property to hold various request body types avaliable
    *
    * @var string
    */        
    static REQUEST_BODY_TYPE_FORM_DATA = 'FormData';
    static REQUEST_BODY_TYPE_RAW = 'Raw';
    static REQUEST_BODY_TYPE_JSON = 'Json';
    /**
    * static class property to hold the request body type available
    *
    * @var array
    */    
    static requestBodyTypes = [
        'FormData',
        'Raw',
        'Json'
    ];
    /**
    * static class property to hold the available for the application
    *
    * @var object
    */    
    static services = {
        BASE_API : process.env.REACT_APP_BACKEND_BASE_URL,
        VPLAY_API : process.env.REACT_APP_VPLAY_URL,
    };    
    /**
    * static class property to hold the unallowed request params
    *
    * @var array
    */    
    static unallowedRequestParamKeys = ["inputErrors"];


    constructor() {
        this.headers = new Headers({
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept' : 'application/json'
        });

        this.resetFactory();
    }
    /**
    * set this service current request made with
    *
    * @param service
    * @return this
    */
    withService(service) {
        this.service = service;

        return this;
    }
    /**
    * check request is failed due to network connection
    *
    * @param responseMessage
    * @return boolean
    */
    isFetchFailure(responseMessage) {
        return responseMessage === 'Failed to fetch';
    }    
    /**
    * set headers for current request
    *
    * @param key
    * @param value
    * @return this
    */
    setHeaders(key,value) {
        this.headers.set(key,value);

        return this;
    } 
    /**
    * remove headers from existing for current request
    *
    * @param key
    * @return this
    */
    removeHeaders(key) {
        if(this.headers.has(key)){
            this.headers.delete(key);
        }

        return this;
    }  
    /**
    * set this service current request made with
    *
    * @param service
    * @return this
    */
    withRequestBodyType(requestBodyType) {
        this.requestBodyType = requestBodyType;

        return this;
    }    
    /**
    * reset this property default for request
    *
    * @return void
    */
    resetFactory(service) {
        this.service = RequestFactory.SASS_API;

        this.requestBodyType = RequestFactory.REQUEST_BODY_TYPE_FORM_DATA;
    }       
    /**
    * check key is allowed for request param
    *
    * @param key
    * @return boolean
    */
    isAllowedRequestParamKey(key) {
        return RequestFactory.unallowedRequestParamKeys.indexOf(key) === -1;
    }    
   /**
    * get available headers
    *
    * @return headers
    */                  
    getHeaders() {
      let accessToken = Authorization.getAccessToken();
      if(accessToken){
        this.headers.set('X-AUTH-TOKEN',accessToken);
      }else{
        this.headers.delete('X-AUTH-TOKEN');
      }
    
      return this.headers;
    }    
   /**
    * get base api url
    *
    * @return string
    */    
    getBaseApiUrl() {
      return RequestFactory.services[this.service];
    }      
   /**
    * convert the object to raw data(string) by
    * Serialize the object with url encode
    * used when form data is not prepared for request body
    * require jquery
    * to work without jquery modify logic defined
    *
    * @param object
    * @return object
    */    
    convertObjectToRawData(obj){
        return jQuery.param(obj);
    } 
   /**
    * filter the request paran
    * remove the unallowed request params
    *
    * @param object
    * @return object
    */    
    filterRequestParam(data){
        if(typeof data === 'object' && Object.keys(data).length > 0){
            RequestFactory.unallowedRequestParamKeys.forEach((key) => {
                if(data.hasOwnProperty(key)){
                    delete data[key];
                }
            });
        }

        return data;
    }           
   /**
    * get base api url
    *
    * @param object
    * @return object
    */    
    getRequestBody(data) {
      var body;
      data = this.filterRequestParam(data);
        const formToJSON = elements => [].reduce.call(elements, (data, element) => {
          data[element.name] = element.value;
          return data;
        }, {});

      switch(this.requestBodyType){
        case RequestFactory.REQUEST_BODY_TYPE_RAW:
            body = this.convertObjectToRawData(formToJSON(data));
        break;
        default:
            body = this.convertObjectToRawData(data);    
      }
      return body;
    }

    /**
    * checkCache
    * @param key
    * @return object|boolean
    */
    checkCache(key,time){
        if(typeof localStorage.getItem('sitecacheddatas') === 'string'){
            let currentTime = Date.now();
            let cachekey = JSON.parse(localStorage.getItem('sitecacheddatas'));
            if(typeof cachekey[key] === 'object' && !(cachekey[key].time + (60 * time * 1000) < currentTime)){
                return cachekey[key];
            }
        }
        return false;
    }
    /**
    * checkCache
    * @param key
    * @return object|boolean
    */
    saveCache(response,url){
        let cachekey = {};
        if(typeof localStorage.getItem('sitecacheddatas') === 'string'){
            cachekey = JSON.parse(localStorage.getItem('sitecacheddatas'));
        }
        response['time'] = Date.now();
        cachekey[url] = response;
        localStorage.setItem('sitecacheddatas',JSON.stringify(cachekey));
    }
    /**
    * call request
    * @param url
    * @param data
    * @param successCallback
    * @param errorCallback
    * @param queryParams
    * @return void
    */ 
    call(type,url,data,successCallback,errorCallback,queryParams,cache) {
        if(type === 'GET'){
            if(cache){                
                let availablecache = this.checkCache(type+this.getUrl(url,queryParams),cache);
                if(!availablecache){
                    let headers = this.getHeaders();
                    this.cacheRequest(this.getUrl(url,queryParams),{
                        method  : 'GET',
                        headers : headers,
                         mode   : 'cors'
                    },successCallback,errorCallback)
                }else{
                    if(typeof successCallback === 'function'){
                        successCallback(availablecache);
                    }
                }
            }else{
                let headers = this.getHeaders();
                this.request(this.getUrl(url,queryParams),{
                    method  : 'GET',
                    headers : headers,
                     mode   : 'cors'
                },successCallback,errorCallback)
            }
        }else{
            this.request(this.getUrl(url,queryParams),{
                method  : type,
                headers : this.getHeaders(),
                body    : this.getRequestBody(data),
            },successCallback,errorCallback);
        }
    }

    /**
    * get request
    * @param url
    * @param successCallback
    * @param errorCallback
    * @param queryParams
    * @return void
    */ 
    get(url,successCallback,errorCallback,queryParams) {
        let headers = this.getHeaders();
        this.request(this.getUrl(url,queryParams),{
            method  : 'GET',
            headers : headers,
             mode   : 'cors'
        },successCallback,errorCallback);
    } 
    /**
    * post request
    * @param url
    * @param data
    * @param successCallback
    * @param errorCallback
    * @param queryParams
    * @return void
    */ 
    post(url,data,successCallback,errorCallback,queryParams) {
        this.request(this.getUrl(url,queryParams),{
            method  : 'POST',
            headers : this.getHeaders(),
            body    : this.getRequestBody(data),
        },successCallback,errorCallback);
    }
    /**
    * put request
    * @param url
    * @param data
    * @param successCallback
    * @param errorCallback
    * @param queryParams
    * @return void
    */ 
    put(url,data,successCallback,errorCallback,queryParams) {
        this.request(this.getUrl(url,queryParams),{
            method  : 'PUT',
            headers : this.getHeaders(),
            body    : this.getRequestBody(data),
        },successCallback,errorCallback);
    }          
    /**
    * delete request
    * @param url
    * @param data
    * @param successCallback
    * @param errorCallback
    * @param queryParams
    * @return void
    */ 
    delete(url,data,successCallback,errorCallback,queryParams) {
        this.request(this.getUrl(url,queryParams),{
            method  : 'DELETE',
            headers : this.getHeaders(),
            body    : this.getRequestBody(data)
        },successCallback,errorCallback);
    }
    /**
    * request
    *
    * @param url
    * @param config
    * @param successCallback
    * @param errorCallback
    * @return void
    */
    cacheRequest(url,config,successCallback,errorCallback) {
        fetch(url,config)
            .then(this.responseParser())
            .then(this.cachedSuccessCallback(successCallback,errorCallback,config.method+url))
            .catch(this.errorCallback(errorCallback));

        this.resetFactory();
    }    
    /**
    * request
    *
    * @param url
    * @param config
    * @param successCallback
    * @param errorCallback
    * @return void
    */
    request(url,config,successCallback,errorCallback) {
        fetch(url,config)
            .then(this.responseParser())
            .then(this.successCallback(successCallback,errorCallback))
            .catch(this.errorCallback(errorCallback));

        this.resetFactory();
    }      
    /**
    * response parser
    * 
    * @return string
    */
    responseParser() {
        return (response) => {
            return response.json();
        }
    }    
    /**
    * callback the sucess method with cache process
    * @param callback
    * @param errorCallback
    * @return string
    */
    cachedSuccessCallback(callback,errorCallback,url) {
        return (json) => {
            if(Utility.isObject(json) && json.hasOwnProperty('is_token_invalid')){
                errorCallback(json);
            } else if(typeof callback === 'function'){
                if(!json.error){
                    this.saveCache(json,url);
                }
                callback(json);
            }
        }
    }   
    /**
    * callback the sucess method
    * @param callback
    * @param errorCallback
    * @return string
    */
    successCallback(callback,errorCallback) {
        return (json) => {
           if(Utility.isObject(json) && json.hasOwnProperty('is_token_invalid')){
                errorCallback(json);
           } else if(typeof callback === 'function'){
                callback(json);
            }
        }
    }
    /**
    * callback the error method
    *
    * @param callback
    * @return string
    */
    errorCallback(callback) {
        return (response) => {
            if(response instanceof TypeError && this.isFetchFailure(response.message)){
                if (process.env.NODE_ENV == 'production') {
                    Authorization.logout();
                    window.location.href = "/";
                }                
            }

            if(typeof callback === 'function'){
                callback(response);
            }
        }
    }
    /**
    * build the query
    *
    * @param queryParams
    * @return string
    */
    buildQueryParams(queryParams) {
        var params      = false;
        var queryLength = Object.keys(queryParams).length;
        var i = 1;


        for(var iter in queryParams) {
          if(typeof queryParams[iter] !== 'undefined'){
            if(!params){
              params = '?';
            }
            if(typeof queryParams[iter] === 'object'){
                for(var queryParamIter in queryParams[iter]) {
                    params += iter+'['+queryParamIter+']='+queryParams[iter][queryParamIter];
                    params += '&';
                }
            } else {
                params += iter+'='+queryParams[iter];
            }

            if(i < queryLength){
                params += '&';
            }
            
            i++;
          }
        }

        return params;
    }
    /**
    * get the url
    *
    * @param path
    * @param queryParams
    * @return string
    */
    getUrl(path,queryParams) {
        var url = this.getBaseApiUrl()+'/'+path;

        return (queryParams) ? url+this.buildQueryParams(queryParams) : url;
    }                         
}

export default new RequestFactory();
