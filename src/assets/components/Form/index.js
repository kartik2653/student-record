import React,{useState,useEffect} from 'react';
import Input from '../Input';
import Button from '../Button';
import Error from '../Error';
import './styles.css';
import eye from '../../images/eye.png';
import { redirect, useNavigate } from 'react-router-dom';
const Form = ({title,isLogin}) => {
    
    //ui -> https://dribbble.com/shots/15880242-Contact-Form-UI-Design-HTML-CSS
    //tab
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[mobileNumber,setMobileNumber] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    const[isError , setError] = useState(false);
    const[errorMessage , setErrorMessage] = useState("");
    const[showPassword,setShowPassword] = useState(false);
    const[showConfirmPassword,setShowConfirmPassword] = useState(false);
    const[adminExists,setAdminExists] = useState(true);

    const navigate = useNavigate();


    const doesAdminExists = (email) =>{
        const response = localStorage.getItem(email);
        console.log(response === null,'response , null');
        return response === null ? false : true;
    }

    const isEmailValid = () =>{
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const isValid = regex.test(email);
        return isValid;
    }

    const isStrongPassword = () =>{
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        const isValid  = regex.test(password);
        return isValid;
    }

    const setToken = () =>{
        const token = (Math.floor((Math.random()*(9999999 - 1000000))) + 1000000);
        localStorage.setItem('token',JSON.stringify(token));
        navigate('/',{replace:true});
    }


    const setValue = (value,key) =>{
        switch (key){
            case 1 :{
                setFirstName(value);
                break;
            }

            case 2 :{
                setLastName(value);
                break;
            }

            case 3 :{
                setMobileNumber(value);
                break;
            }

            case 4 :{
                setEmail(value);
                break;
            }

            case 5 :{
                setPassword(value);
                break;
            }

            case 6 :{
                setConfirmPassword(value);
                break;
            }

            default :{}
        }
    }

    const formHandler = (e) =>{
        console.log('run');
        e.preventDefault();

        if(!isLogin){
            console.log('not login');
            if( firstName.length < 3){
                console.log('not login 1');
                setError(true);
                setErrorMessage(["First name must be of at least 3 characters"]);
            }
            else if( lastName.length < 3){
                setError(true);
                setErrorMessage(["Last name length must be of at least 3 characters"]);
            }
            else if( mobileNumber.length !== 10){
                setError(true);
                setErrorMessage(["Mobile number must be of 10 digits"]);
            }
            else if(!isEmailValid()){
                setError(true);
                setErrorMessage(["Enter valid email"]);
            }
            else if(!isStrongPassword()){
                setError(true);
                setErrorMessage(["Password must be strong","Minimum 8 characters in length","At least one uppercase English letter","At least one lowercase English letter","At least one digit","At least one special character"]);
            }

            else if(password.localeCompare(confirmPassword)){
                setError(true);
                setErrorMessage(["Passwords are not same"]);
            }

            else{
                const doesExists = doesAdminExists(email);
                if(doesExists){
                 setError(true);
                  setErrorMessage(["Admin already exists, try logging in"]);
                }else{
                const admin = {
                    firstName : firstName,
                    lastName : lastName,
                    mobileNumber : mobileNumber,
                    email : email,
                    password : password,
                }
                localStorage.setItem(email,JSON.stringify(admin));
                 navigate('/login',{replace:true});
                //effect of return.
                // return;
              }

            }
        }
        else{
            //check if user exists using email
            const isValid = isEmailValid();
            if(!isValid){
                setError(true);
                setErrorMessage(["Enter valid email"]);
                 return;
            }
            const doesExists = doesAdminExists(email);
            //verify if email and password are same.
            if(doesExists){
                const adminDetailsJSON = localStorage.getItem(email);
                const adminDetails = JSON.parse(adminDetailsJSON);
                if( password === adminDetails.password){
                    //move to dashboard
                    setToken();
                }else{
                    setError(true);
                    setErrorMessage(["Wrong password"]);
                }
                
            }else{
              setError(true);
              setErrorMessage(["User does not exists, try signing in"]); 
            }


        }
        
        console.log("Form submitted");
    }

    useEffect(() => {
        setError(false);
        setShowConfirmPassword(false);
        setShowPassword(false);
    },[isLogin]);
    return (
        <div className='formContainer'>
            <h2 style={{color:'#675DE7',fontFamily:'Montserrat',}}>{title}</h2>
            <form onSubmit={formHandler}>
                 {!isLogin && <Input placeholder = 'First name' type = 'text' onChange = {setValue} flag = {1} isLogin = {isLogin} defaultValue={-1} />}
                 {!isLogin && <Input placeholder = 'Last Name' type = 'text' onChange = {setValue} flag = {2} isLogin = {isLogin} defaultValue={-1}/> }
                 {!isLogin && <Input placeholder = 'Mobile Number' type = 'number' onChange = {setValue} flag = {3} isLogin = {isLogin} defaultValue={-1}/>}
                 <Input placeholder = 'Email' type = 'email' onChange = {setValue} flag = {4} isLogin = {isLogin} defaultValue={-1}/>
                 <div className='passwordContainer'>
                 <Input placeholder = 'Password' type = {showPassword ? 'text' : 'password'} onChange = {setValue} flag = {5} isLogin = {isLogin} defaultValue={-1}/>
                  <div className='eyeContainer'>
                     <img className='eye' src={eye} alt='Show password' onClick={()=> setShowPassword((prev) => !prev)}/>
                  </div>
                 </div>
                 {!isLogin && <div className='passwordContainer'>
                    <Input placeholder = 'Confirm Password' type = {showConfirmPassword ? 'text' : 'password'} onChange = {setValue} flag = {6} isLogin = {isLogin}/>
                    <div className='eyeContainer'>
                     <img className='eye' src={eye} alt='Show password' onClick={()=>setShowConfirmPassword((prev)=>!prev)}/>
                  </div>
                    </div>}
                 {isError && <Error message={errorMessage}/>}
                 <Button text = 'Submit' type = 'submit' onClick={formHandler} onChange = {setValue}/>
            </form>
        </div>
    );
}
 
export default Form;