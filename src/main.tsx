import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import store from '@utils/redux/store';
import App from '@pages/App';
import ErrorPage from '@pages/ErrorPage';
import Home from '@pages/Home';
import SignIn from '@pages/SignIn';
import User from '@pages/User';

import './main.css';

const router = createBrowserRouter([
  {
    path: '/PierreCourant_13_15102022/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <SignIn />,
      },
      {
        path: 'profile',
        element: <User />,
      },
    ],
  },
]);

// Type Assertions : document.getElementById('root') as HTMLElement
// should only be used when you're absolutely sure that the value is of the expected type.

// An alternative and much better approach is to use a type guard.
const root = document.getElementById('root');
const queryClient = new QueryClient();

if (root != null) {
  ReactDOM.createRoot(root).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </Provider>
    </QueryClientProvider>,
  );
}
