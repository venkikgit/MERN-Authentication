import React from "react";
import { BrowserRouter as Router, useRoutes , Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


const user = localStorage.getItem('token');
const routes = [
  {
    path:'/register',
    element: !user?<Register/> :<Navigate to='/dashboard'/>
  },
  {
    path:'/login',
    element:!user?<Login/> :<Navigate to='/dashboard'/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:"/",
    element:<Home/>
  }
]

function AppRoutes(){
  return useRoutes(routes);
}
function App() {
  return (
    <Router>
      <AppRoutes/>
      <ToastContainer />
    </Router>
    
  );
}

export default App;
