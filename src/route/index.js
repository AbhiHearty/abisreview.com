import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../components/layouts/Loader';
import { Route } from "react-router-dom";
import NotFound from '../components/layouts/NotFoundComponent';

/**
 * List of routes for the page
 */
export const ROUTE = [
    {
        private: false,
        exact: true,
        path: '/',
        component: Loadable({
            loader: () => import ('../containers/Home'),
            loading: Loader,
        })
    },
    {
        private: false,
        exact: true,
        path: '/list',
        component: Loadable({
            loader: () => import ('../containers/List'),
            loading: Loader,
        })
    },
    {
        private: false,
        exact: true,
        path: '/detail/:id',
        component: Loadable({
            loader: () => import ('../containers/Detail'),
            loading: Loader,
        })
    },
    {
        private: true,
        exact: true,
        path: '/add-post',
        component: Loadable({
            loader: () => import ('../containers/AddPost'),
            loading: Loader,
        })
    },
    {
        private: false,
        exact: true,
        path: '/login',
        component: Loadable({
            loader: () => import ('../containers/Login'),
            loading: Loader,
        })
    },
    {
        private: false,
        component: NotFound
    },
];

/**
 * Set all routes for the page
 */
export const setRoutes = (Application) => {
    let route = ROUTE;
    return route.map((eachRoute, index) => {
        if(eachRoute.path){            
            return <Route
                exact = {eachRoute.exact}
                path = {eachRoute.path}
                render = {
                    (props) => {
                        return (<Application {...eachRoute} {...props} />);
                    }
                }
            />
        }else{
            return <Route
                render = {
                    (props) => {
                        return (<Application {...eachRoute} {...props} />);
                    }
                }
            />

        }
    });

}