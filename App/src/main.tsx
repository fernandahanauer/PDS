import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './components/pages/home';
import { ResourcePage } from './components/pages/resourcePage';
import { Header } from './components/shared/header';
import LeftNavigation from './components/shared/left-navigation';
import { Grid } from '@mui/material';
import { Vagas } from './components/pages/positions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/resource/:id",
    element: <ResourcePage />
  },
  {
    path: "/vagas",
    element: <Vagas />
  }
  
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer 
      autoClose={3000}
      hideProgressBar={false}
      pauseOnHover
      newestOnTop
      closeOnClick
      theme='light'
    />
    <Grid container>
      <Grid item xs={1} >
        <LeftNavigation />
      </Grid>
      <Grid item xs={11}>
        <Header />

        <RouterProvider router={router} />
      </Grid>
    </Grid>

  </React.StrictMode>,
)
