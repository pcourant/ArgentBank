import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './main.css';
import Root from './routes/Root';
import ErrorPage from './error-page';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import User from './routes/User';

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
            {
                path: 'user',
                element: <User />,
            },
        ],
    },
]);

// Type Assertions : document.getElementById('root') as HTMLElement
// should only be used when you're absolutely sure that the value is of the expected type.

// An alternative and much better approach is to use a type guard.
const root = document.getElementById('root');

if (root != null) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    );
}
