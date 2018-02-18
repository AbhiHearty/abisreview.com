import React from 'react';
import { Route } from "react-router-dom";
import { locale,avaliableLanguages } from '../../locale';
import Authorization from '../../utility/authorization';
import Header from './Header';
import Footer from './Footer';
import { ROUTE, setTitle, setMetaDescription } from '../../route';
import toastr from 'toastr';
import {firebase} from '../firebase';

/**
 * toast message configuration, If needed to used in any component we have to newly configure in that components also
 */
toastr.options.timeOut = 2000;
toastr.options.extendedTimeOut = 3000;

/**
 * Class Application
 *
 * Acts as a base components
 *
 * authorization, locale props configured here.
 */
class Application extends React.Component {
    /**
     * render function
     * 
     * Application layout defined here.
     * Header, body components can be done.
     *
     * New components for the layout for the application can be added here.
     */
    render() {
        let Component = this.props.component;
        let appAuth = {login:this.handleLogIn,logout:this.handleLogout}
        let meta = this.props.meta
        setTitle((meta && meta.title) ? meta.title : '');
        setMetaDescription((meta && meta.description) ? meta.description : '');
        return  <div>
                    <Header app = {appAuth} loadselectlocale={this.loadSelectLanguage} path={this.props.path} private={this.props.private} locale={locale} auth={Authorization} history = {this.props.history} location = {this.props.location} match = {this.props.match} />
                    <Component app = {appAuth} path={this.props.path} private={this.props.private} locale={locale} auth={Authorization} history = {this.props.history} location = {this.props.location} match = {this.props.match} />
                    <Footer app = {appAuth} loadselectlocale={this.loadSelectLanguage} path={this.props.path} private={this.props.private} locale={locale} auth={Authorization} history = {this.props.history} location = {this.props.location} match = {this.props.match} />
                </div>
    }
    /**
     * React lifecycle funtion componentWillMount
     *
     * fires after constructor and befoer render funtion.
     *
     * * Validating the type of call and updating/ removing the session storage used for tracking the previous private route
     *
     * * Initialize own funtion of history props block function: 
     *     Validate using the list of routes avaliable and blocks the route to proceed if the user is not logged in.
     */
    componentWillMount() {
        let comp = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //comp.props.history.push('/');
              // User is signed in.
            } else {
                // Validating the current route and restricts the user from accessing the route if not logged in.
                if (comp.props.private) {
                    toastr.error(locale.common.pleaseLoginToContinue);
                    return false;
                }
            }
          })
    }
    /**
     * Funtion to check route for authorized user 
     *
     * checks the requesting route is private and user is logged in or not
     *
     */
    checkRoute(route,nextroute,current){
        if(route.path && route.path.split('/').length>0 && nextroute.pathname.split('/').length>0 && nextroute.pathname.split('/').length === route.path.split('/').length){
            let r = true;
            for (let i = route.path.split('/').length - 1; i >= 0; i--) {
                if(route.path.split('/')[i].charAt(0) === ':'){
                    continue;
                }
                if(route.path.split('/')[i]!==nextroute.pathname.split('/')[i]){
                    r = false;
                }
            }
            return r && route.private === Authorization.isLoggedIn();
        }
        return false;
    }

    /**
     * Function to logout
     */
    handleLogout = () =>{
        if(Authorization.isLoggedIn()){
            Authorization.logout();
            sessionStorage.removeItem('proute');
            toastr.success(locale.common.logoutIsSuccessful);
            this.logoutRedirect();
            return false;
        }
    }

    /**
     * Function to login
     */
    handleLogIn = (userDetails) =>{
        Authorization.login(userDetails);
        if (Authorization.isLoggedIn()) {
            if((sessionStorage.hasOwnProperty('proute') && typeof JSON.parse(sessionStorage.getItem('proute')).pathname === 'string')){
                this.props.history.push(JSON.parse(sessionStorage.getItem('proute')).pathname + JSON.parse(sessionStorage.getItem('proute')).search + JSON.parse(sessionStorage.getItem('proute')).hash);
            }else{
                this.props.history.go(process.env.REACT_APP_HOMEPAGE);
            }
            return true;
        }
    }

    /**
     * Function to redirect after login
     */
    logoutRedirect(){
        let filteredCurrentRoute = ROUTE.filter((filterSingleRoute)=>{return this.checkRouteIsPrivate(filterSingleRoute)});
        if(filteredCurrentRoute[0].private){
            this.props.history.push(process.env.REACT_APP_HOMEPAGE);
        }else{
            this.props.history.go();
        }
    }
    /**
     * Funtion to check the passing route is private or not.
     */
    checkRouteIsPrivate(route){
        let currentRoute = this.props.location;
        if(route.path.split('/').length>0 && currentRoute.pathname.split('/').length>0 && currentRoute.pathname.split('/').length === route.path.split('/').length){
            let returnBuffer = true;
            for (let i = route.path.split('/').length - 1; i >= 0; i--) {
                if(route.path.split('/')[i].charAt(0) === ':'){
                    continue;
                }
                if(route.path.split('/')[i]!==currentRoute.pathname.split('/')[i]){
                    returnBuffer = false;
                }
            }
            return returnBuffer;
        }
        return false;
    }

    /**
     * Changing locale to selected value.
     */
    changeLocale = (e) => {
        locale.setLanguage(e.target.value);
        localStorage.setItem('language', e.target.value);
        this.props.history.push(this.props.location.pathname + this.props.location.search + this.props.location.hash);
    }

    /**
     * Funtion to load the list of languages given for locale.
     */
    loadLanguages = () => {
        return Object.keys(avaliableLanguages).map((language, index) => {
            return <option key={index.toString()}  value={language} selected={(locale.getLanguage()==language)?true:false}>{avaliableLanguages[language]}</option>
        });
    }
    
    /**
     * Funtion to load the language select HTML.
     */
    loadSelectLanguage = () => {
        return (<select onChange={this.changeLocale}>
            {this.loadLanguages()}
         </select>);
    }
}
export default Application;