import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../components/layouts/Loader';
import { Route } from "react-router-dom";

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
        path: '/detail',
        component: Loadable({
            loader: () => import ('../containers/Detail'),
            loading: Loader,
        })
    }
];

/**
 * Set all routes for the page
 */
export const setRoutes = (Application) => {
    let route = ROUTE;
    return route.map((eachRoute, index) => {
        return <Route
            exact = {eachRoute.exact}
            path = {eachRoute.path}
            render = {
                (props) => {
                    return (<Application {...eachRoute} {...props} />);
                }
            }
        />
    });

}