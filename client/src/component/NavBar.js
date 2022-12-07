import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './navbar.css'
const NavBar = () => {
    const info = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleSignout = (e)=>{
        e.preventDefault();
        toast.success('Logged out successfully')
        localStorage.clear();
        navigate('/')
    }
  return (
    <nav>
      <h1><a href="/">Simple App</a></h1>
      {info?<button onClick={handleSignout}>Sign Out</button>:''}
      </nav>
  )
}

export default NavBar