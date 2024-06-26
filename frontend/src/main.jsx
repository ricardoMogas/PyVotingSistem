import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import VotingPage from "./pages/VotingPage.jsx"
import ResultPage from "./pages/ResultPage.jsx"
import AdminPage from './pages/AdminPage.jsx'
import OfficialPage from './pages/OfficialPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        title: "Votar",
        path: "/voting",
        element: <VotingPage />,
      },
      {
        title: "Resultados",
        path: "/Results",
        element: <ResultPage />
      },
    ]
  },
  {
    path: "/administrador",
    element: <AdminPage />
  },
  {
    path: "/official",
    element: <OfficialPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
