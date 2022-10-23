import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './main.css';
import App from './pages/App';
import ErrorPage from './error-page';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
