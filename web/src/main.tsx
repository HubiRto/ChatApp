import './index.css'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AuthProvider} from "@/providers/AuthContext.tsx";
import {ToastProvider} from "@/providers/ToastProvider.tsx";
import {ProtectedRouteWrapper} from "@/wrapper/ProtectedRouteWrapper.tsx";
import {SidebarWrapper} from "@/wrapper/SidebarWrapper.tsx";
import {IsLoginWrapper} from "@/wrapper/IsLoginWrapper.tsx";
import React from "react";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/auth/LoginPage.tsx";
import RegisterPage from "@/pages/auth/RegisterPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";


const wrapWithProtectedRoute = (element: React.ReactNode) => <ProtectedRouteWrapper children={element}/>;
const isLoginWrapper = (element: React.ReactNode) => <IsLoginWrapper children={element}/>;
const sidebarWrapper = (element: React.ReactNode) => <SidebarWrapper children={element}/>;


const routesConfig = [
    {path: "/", element: <HomePage/>, wrappers: [wrapWithProtectedRoute, sidebarWrapper], errorElement: <ErrorPage/>},
    {path: "/login", element: <LoginPage/>, wrappers: [isLoginWrapper], errorElement: <ErrorPage/>},
    {path: "/register", element: <RegisterPage/>, wrappers: [isLoginWrapper], errorElement: <ErrorPage/>},
];

const composeWrappers = (wrappers: ((element: React.ReactNode) => React.ReactNode)[], element: React.ReactNode) =>
    wrappers.reduceRight((acc, wrapper) => wrapper(acc), element);

const routes = routesConfig.map(({path, element, wrappers, errorElement}) => ({
    path,
    element: composeWrappers(wrappers, element),
    errorElement
}));

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ToastProvider/>
        <RouterProvider router={router}/>
    </AuthProvider>
)
