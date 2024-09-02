import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Home from './routes/Home';
import Login from './routes/Login';
import NovaProposta from './routes/NovaProposta';
import NovaRedacao from './routes/NovaRedacao';
import NovaCorrecao from './routes/correcao/NovaCorrecao';
import ListarCorrecao from './routes/correcao/ListarCorrecao';
import Sobre from './routes/Sobre';
import Turmas from './routes/Turmas';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './routes/Signup';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/novaproposta",
        element: <NovaProposta />,
      },
      {
        path: "/sobre",
        element: <Sobre />,
      },
      {
        path: "/novaredacao",
        element: <NovaRedacao />,
      },

      {
        path: "/novacorrecao",
        element: <NovaCorrecao />,
      },
      {
        path: "/correcao",
        element: <ListarCorrecao />,
      },
      {
        path: "/turmas",
        element: <Turmas />,
      },

    ]
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
