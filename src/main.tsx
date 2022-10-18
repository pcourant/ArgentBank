import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import 'normalize.css';

import './main.css';
import Root from './routes/Root';
import ErrorPage from './error-page';
import Home from './routes/Home';
import SignIn from './routes/SignIn';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'sign-in',
                element: <SignIn />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
