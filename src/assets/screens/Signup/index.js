import React,{useState,useEffect} from 'react';
import './styles.css';
import Button from '../../components/Button';
import Form from '../../components/Form';
import { NavLink, Navigate } from 'react-router-dom';

const Signup = () => {
    
    const[isAuthorized,setAuthorized] = useState(false);
    
    const getAdminStatus = () =>{
        const token  = localStorage.getItem('token');
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
        { isAuthorized ? <Navigate to={'/'} replace/> :
        <div className='authContainer' >
            <div className='topButtonContainer'>
                <NavLink style={{width:'50%',textDecoration:'none'}} to={'/login'}><Button text = 'Log in' onClick={()=>console.log("Logn in")} /></NavLink>
                <NavLink style={{width:'50%',textDecoration:'none'}}><Button text = 'Sign up' onClick={()=> console.log("Sign up")} /></NavLink>
            </div>
            <Form title= 'Sign up' isLogin= {false} />

        </div>
        }
        </>
     );
}
 
export default Signup;