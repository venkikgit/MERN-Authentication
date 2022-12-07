import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../component/NavBar';

const Dashboard = () => {
    const location = useLocation();
    const navigate =useNavigate();
    // console.log(location.state.token);
    // console.log(localStorage.getItem('token'))
    useEffect(() => {
      if (localStorage.getItem('token') === null) {
        toast.error("User not authenticated");
        navigate('/');
      }
      if (localStorage.getItem('token') === location.state?.token) {
        console.log('Welcome to the Dashboard');
      }
    }, [localStorage]);
  return (
    <div> 
      <NavBar/>
      <div style={{ height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        {localStorage.getItem('email')}
      </div>
    </div>
  )
}

export default Dashboard