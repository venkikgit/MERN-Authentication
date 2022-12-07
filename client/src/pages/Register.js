import React, { useState } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import NavBar from '../component/NavBar';
import '../styles/register.css'

const Register = () => {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const navigate =useNavigate();
  const handleSubmit =  async(e)=>{
    e.preventDefault();
   try{ 
    const response = await axios.post('http://localhost:8000/api/users/sign-up', {
      email,
      password,
      name
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response.data);

    if(response.data.success === true){
      toast.success('Registered successfully');
      navigate('/login');
    }
  }catch(error){
    if(error.response.data.success === false){
      toast.error("User already exists");
      navigate('/register');
    }
  }
    // console.log("User status",response.data.success)
  
  }
  return (
    <>
    <NavBar/>
      <div className='container'>
        <div className='containerWrapper'>
        <span className='title'style={{display:'flex',justifyContent:'center'}}><h3>Register</h3></span>
    <form className="Register" onSubmit={handleSubmit} >
      <input 
        type="name" 
        placeholder='Name'
        onChange={(e) => setName(e.target.value)} 
        value={name}
        required 
        />
      
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

      <button type='submit'>Register</button>
    </form>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <p>Have an account?</p>
      <a href='/login'>Login</a>
        </div>
        </div>
      </div>
        </>
  )
}

export default Register