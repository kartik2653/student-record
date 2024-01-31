import React,{useEffect, useState} from 'react';
import './styles.css';
import Button from '../../components/Button';
import Form from '../../components/Form';
import { NavLink, Navigate } from 'react-router-dom';

const Login = () => {
    
    const[isAuthorized,setAuthorized] = useState(false);
    const getAdminStatus = () =>{
        const token = localStorage.getItem('token');
        console.log(token,"token");
        if(token){
            setAuthorized(true);
        }else{
            setAuthorized(false);
        }
    }
    useEffect(()=>{
        getAdminStatus();
    },[])
    return (
        <>
        {isAuthorized ? <Navigate to={'/'} replace/> : 
        <div className='authContainer' >
        <div className='topButtonContainer'>
           <NavLink style={{width:'50%',textDecoration:'none'}}><Button text = 'Log in' onClick={()=>console.log("Log in")} /></NavLink>
           <NavLink style={{width:'50%',textDecoration:'none'}} to={'/signup'} ><Button text = 'Sign up' onClick={()=> console.log("Sign up")} /></NavLink>
        </div>
        <Form title = "Log in" isLogin= {true}  />

       </div>}
        </>
     );
}
 
export default Login;