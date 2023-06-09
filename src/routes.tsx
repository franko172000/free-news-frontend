import { createBrowserRouter, Navigate } from 'react-router-dom';
import Homepage from "pages/Homepage";
import Login from "pages/Login";
import AuthLayout from "layouts/AuthLayout";
import Register from "pages/Register";
import UserLayout from "layouts/UserLayout";
import Dashboard from "pages/user/Dashboard";
import Profile from "pages/user/Profile";
import Preferences from "pages/user/Preferences";
import store from 'store';
import {AUTH_STORAGE_KEY, DASHBOARD_ROUTE, LOGIN_ROUTE} from "./constants";
const storage = store.get(AUTH_STORAGE_KEY);

export default createBrowserRouter ([
    {
        path: '/',
        element: <Homepage />
    },
    {
        path: '/auth/',
        element: !storage ? <AuthLayout /> : <Navigate to={DASHBOARD_ROUTE} />,
        children:[
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
        ]
    },
    {
        path: '/user/',
        element: storage ? <UserLayout /> : <Navigate to={LOGIN_ROUTE} />,
        children:[
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'preferences',
                element: <Preferences />
            },
        ]
    }
])