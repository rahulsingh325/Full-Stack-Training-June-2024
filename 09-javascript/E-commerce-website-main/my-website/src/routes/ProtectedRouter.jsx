import { createBrowserRouter, Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import Products from "../pages/Products";
import Wishlist from "../pages/Wishlist";
import RootLayout from "../layout/RootLayout";
import NotFound404 from "../pages/NotFound404";
import Category from "../pages/Category";
import ProductDetail from "../pages/ProductDetail";
import CategoriesLayout from "../layout/CategoriesLoyout";
import Home from "../pages/Home";
import Cart from "../pages/Cart"; 
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import CheckOut from "../pages/CheckOut";

export const ProtectedRouter = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "wishlist", element: <Wishlist /> }, 
            { path: "cart", element: <Cart /> },
            { path: "/product/:id", element: <ProductDetail /> },
            {
                path: "/products",
                element: <CategoriesLayout />,
                children: [
                    { index: true, element: <Products /> },
                    { path: "category/:slug", element: <Category /> }, 
                    
                ]
            },
            { path: "profile", element: <Profile /> },
            { path: "checkout", element: <CheckOut /> },
        ],
    },
    { path: "/404", element: <NotFound404 /> },
    { path: "*", element: <Navigate to="/404" /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
]);

export default ProtectedRouter;
