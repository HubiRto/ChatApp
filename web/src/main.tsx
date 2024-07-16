import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginPage from "@/pages/auth/LoginPage.tsx";
import RegisterPage from "@/pages/auth/RegisterPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AuthProvider} from "@/providers/AuthContext.tsx";
import {ToastProvider} from "@/providers/ToastProvider.tsx";
import HomePage from "@/pages/HomePage.tsx";
import ProtectedRouteWrapper from "@/wrapper/ProtectedRouteWrapper.tsx";
import GuestRouteWrapper from "@/wrapper/GuestRouteWrapper.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";


const wrapWithGuestRoute = (element: React.ReactNode) => <GuestRouteWrapper>{element}</GuestRouteWrapper>;
const wrapWithProtectedRoute = (element: React.ReactNode) => <ProtectedRouteWrapper>{element}</ProtectedRouteWrapper>;


const routesConfig = [
    {path: "/", element: <HomePage/>, wrappers: [wrapWithProtectedRoute], errorElement: <ErrorPage/>},
    {path: "/login", element: <LoginPage/>, wrappers: [wrapWithGuestRoute], errorElement: <ErrorPage/>},
    {path: "/register", element: <RegisterPage/>, wrappers: [wrapWithGuestRoute], errorElement: <ErrorPage/>},
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
    <React.StrictMode>
        <AuthProvider>
            <ToastProvider/>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>,
)
