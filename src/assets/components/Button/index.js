import React from 'react';
import './styles.css';
const Button = ({text,onClick,isLogin}) => {
    return (
        <div className='buttonContainer' style={{width:'45%',margin:'auto',cursor:'pointer'}} onClick={(e)=>onClick(e)}>

            <button className={`${isLogin && 'activeButton'} ${!isLogin && 'inactiveButton'} ${text === 'Submit' && 'activeButton'}`} >
                {text}
            </button>

        </div>
    );
}
 
export default Button;