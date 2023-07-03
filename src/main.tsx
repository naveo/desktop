import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Containers from './tabs/containers';
import Images from './tabs/images';
import Volumes from './tabs/volumes';
import Settings from './tabs/settings';
import { StartSidecars } from './sidecars';

// Disable right-click menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

StartSidecars();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'containers',
        element: <Containers />,
      },
      {
        path: 'images',
        element: <Images />,
      },
      {
        path: 'Volumes',
        element: <Volumes />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
