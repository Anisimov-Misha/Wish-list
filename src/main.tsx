import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './main.css';

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);
    }, []);

    const router = createBrowserRouter([
        { path: '/', element: <AuthPage /> },
        { path: '/main', element: isAuth ? <MainPage /> : <Navigate to="/" /> },
        { path: '*', element: <ErrorPage /> },
    ]);

    return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
