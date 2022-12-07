import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../component/NavBar';
import '../styles/register.css'


const Login = () => {
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const navigate =useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:8000/api/users/sign-in', {
      email,
      password,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log(response.data);
    if(response.data.success === false) {
        toast.error(response.data.message);
    }

    if(response.data.success === true) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem('email', response.data.email);
        navigate('/dashboard',{state:{token:response.data.accessToken,email:response.data.email}});
    }
    }catch(error){
        toast.error(error.response.data.message);
    }
  }
  return (
    <>
    <NavBar/>
    <div className='container'>
        <div className='containerWrapper'>
        <span className='title'style={{display:'flex',justifyContent:'center'}}><h3>Login</h3></span>
    <form className="login" onSubmit={handleSubmit} >
      <input 
        type="email" 
        placeholder='Email address'
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        required 
      />
      <input 
        type="password"
        placeholder='Password' 
        onChange={(e) => setPassword(e.target.value)} 
        value={password}
        required 
      />
      <button type='submit'>Log in</button>
    </form>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <p>Don't have an account?</p>
      <a href='/register'>Register</a>
        </div>
    </div>
    </div>
    </>
  )
}

export default Login