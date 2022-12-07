import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../component/NavBar'

const Home = () => {
  return (
    <div>
        <NavBar/>
        <div className='Container' style={{height:'80vh',display:'flex',alignItems:'center',justifyContent:'center',gap:'25px'}}>
            <div><a href='/register' className='btn'>Register</a></div>
            <div><a href='/login' className='btn'>Login</a></div>
        </div>
    </div>
  )
}

export default Home