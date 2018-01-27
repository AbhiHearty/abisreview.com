import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import reducer from './reducers';
import asycMiddleWare from './middleware/asyc';
import {setRoutes} from './route';
import Application from './components/layouts/Application';
import './assets/css/index.css';
import 'toastr/build/toastr.min.css';

/**
 * Import asyc middleware
 */
const middleware = [asycMiddleWare];

/**
 * Initialize APP
 */
class App extends Component {
    /**
     * React default render function
     *
     * Create provider and set store with middlewares and defining all routes.
     */
    render() {
        return (<Provider store={createStore(reducer,compose(applyMiddleware(...middleware)))}>
                <BrowserRouter basename={process.env.REACT_APP_HOMEPAGE}>
                    <Switch>
                        {setRoutes(Application)}
                    </Switch>
                </BrowserRouter>
            </Provider>);
    }
}

export default App;