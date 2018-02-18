import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../components/layouts/Loader';
import { Route } from "react-router-dom";
import NotFound from '../components/layouts/NotFoundComponent';

export const siteTitle = 'abhisreview.com | Movie Reviews by Abhi | abhisreview.';
export const siteMetaDescription = 'Movie Reviews by Abhi | abhisreview';
export const setTitle = (title) => {
    document.title = (title) ? title : siteTitle;
}
export const setMetaDescription = (description) => {
    document.querySelector('meta[name="description"]').setAttribute("content", (description) ? description : siteMetaDescription);
}

/**
 * List of routes for the page
 */
export const ROUTE = [
    {
        private: false,
        exact: true,
        path: '/', 
        meta: {
            title: siteTitle,
            description: siteMetaDescription,
        },
        component: Loadable({
            loader: () => import ('../containers/Home'),
            loading: Loader,
        })
    },
    {
        private: false,
        exact: true,
        path: '/list', 
        meta: {
            title: siteTitle,
            description: siteMetaDescription,
        },
        component: Loadable({
            loader: () => import ('../containers/List'),
            loading: Loader,
        })
    },
    {
        private: false,
        exact: true,
        path: '/detail/:id',
        meta: {
            title: siteTitle,
            description: siteMetaDescription,
        },
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