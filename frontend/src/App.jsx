import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Navbar from './components/navbar';

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <>
      <Navbar  />
      <Outlet />
    </>
  )
}

export default App
