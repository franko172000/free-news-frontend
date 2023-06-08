import { createBrowserRouter } from 'react-router-dom';
import Homepage from "pages/Homepage";
import Login from "pages/Login";
import AuthLayout from "layouts/AuthLayout";
import Register from "pages/Register";
import UserLayout from "layouts/UserLayout";
import Dashboard from "pages/user/Dashboard";
import Profile from "pages/user/Profile";
import Preferences from "pages/user/Preferences";

export default createBrowserRouter ([
    {
        path: '/',
        element: <Homepage />
    },
    {
        path: '/auth/',
        element: <AuthLayout />,
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
        element: <UserLayout />,
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