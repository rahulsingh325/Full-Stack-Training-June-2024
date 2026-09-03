import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Order from "../pages/Order";
import History from "../pages/History";
import Bills from "../pages/Bills";
import Product from "../pages/Product";
import Login from '../pages/authentication/Login'
import ProfileLayout from "../layouts/ProfileLayout";
import Analytics from "../pages/profile/Analytics";
import AccountSetting from "../pages/profile/AccountSetting";
import Reports from "../pages/profile/Reports";
import Transactions from "../pages/profile/Transactions";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import Register from "../pages/authentication/Register";
import NotFound404 from "../pages/NotFound404";


export const Router = createBrowserRouter([
    {
        path:'*',
        element:<NotFound404 />
    },
    {
        path:'/',
        element:<RootLayout />,
        children:[
            {
                index:true,
                element:<Dashboard />
            },
            {
                path:'orders',
                element:<Order />
            },
            {
                path:'history',
                element:<History />
            },
            {
                path:'bills',
                element:<Bills />
            },
            {
                path:'products',
                element:<Product />
            },
            {
                path:'profile',
                element:<ProfileLayout />,
                children:[
                    {
                        index:true,
                        element:<Analytics />
                    },
                    {
                        path:'account-setting',
                        element:<AccountSetting />
                    },
                    {
                        path:'reports',
                        element:<Reports />
                    },
                    {
                        path:'transactions',
                        element:<Transactions />
                    }
                ]
            }
        ]
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/forgot-password',
        element:<ForgotPassword />
    }
])