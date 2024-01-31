import React from 'react';
import './styles.css';
import error from '../../images/error.png';
const ErrorElement = () => {
    return ( 
    <div className='errorContainer'>
      <div className='errorImageContainer'>
        <img src={error} className='errorImage' alt='404 Page not found'/>
      </div>  
    </div>
    );
}
 
export default ErrorElement;