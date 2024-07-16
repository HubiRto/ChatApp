import './index.css'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AuthProvider} from "@/providers/AuthContext.tsx";
import {ToastProvider} from "@/providers/ToastProvider.tsx";
import {ProtectedRouteWrapper} from "@/wrapper/ProtectedRouteWrapper.tsx";
import {SidebarWrapper} from "@/wrapper/SidebarWrapper.tsx";
import React from "react";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/auth/LoginPage.tsx";
import RegisterPage from "@/pages/auth/RegisterPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import ConversationsPage from "@/pages/ConversationsPage.tsx";
import ConversationPage from "@/pages/ConversationPage.tsx";
import FriendsPage from "@/pages/FriendsPage.tsx";
import {ThemeProvider} from "@/providers/ThemeProvider.tsx";


const wrapWithProtectedRoute = (element: React.ReactNode) => <ProtectedRouteWrapper children={element}/>;
const sidebarWrapper = (element: React.ReactNode) => <SidebarWrapper children={element}/>;


const routesConfig = [
    {path: "/", element: <HomePage/>, wrappers: [wrapWithProtectedRoute, sidebarWrapper], errorElement: <ErrorPage/>},
    {
        path: "/conversations",
        element: <ConversationsPage/>,
        wrappers: [wrapWithProtectedRoute, sidebarWrapper],
        errorElement: <ErrorPage/>
    },
    {
        path: "/conversations/:conversationId",
        element: <ConversationPage/>,
        wrappers: [wrapWithProtectedRoute, sidebarWrapper],
        errorElement: <ErrorPage/>
    },
    {
        path: "/friends",
        element: <FriendsPage/>,
        wrappers: [wrapWithProtectedRoute, sidebarWrapper],
        errorElement: <ErrorPage/>
    },
    {path: "/login", element: <LoginPage/>, wrappers: [], errorElement: <ErrorPage/>},
    {path: "/register", element: <RegisterPage/>, wrappers: [], errorElement: <ErrorPage/>},
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
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RouterProvider router={router}/>
        </ThemeProvider>
    </AuthProvider>
)
