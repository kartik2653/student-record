import React, { Fragment,useEffect,useState } from 'react';
import './styles.css';
import eye from '../../images/eye.png'

const Input = ({placeholder,type,onChange,flag,isLogin,defaultValue,customWidth = 0}) => {

  const[value,setValue] = useState(defaultValue);
  const valueHandler = (e) =>{
    setValue((prevValue) => e.target.value);
    
  }

  useEffect(()=>{
    onChange(value,flag);
  },[value]);

  useEffect(()=>{
   defaultValue === -1 && setValue('');
  },[isLogin])


    return (
        <Fragment>
          <input 
            type={type}
            placeholder ={placeholder} 
            className='input'
            value={value}
            onChange={(e)=>valueHandler(e)}/>
        </Fragment>
    );
}
 
export default Input;