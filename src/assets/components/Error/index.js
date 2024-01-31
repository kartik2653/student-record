import React, { useState } from 'react';
import './styles.css';
const Error = ({message}) => {
    return (
        // <p className='error'>**{message}</p>
        <div>
            {
              message.map((msg,ind) => <div key={ind}><p className='error'>{msg}</p></div>)
            }
        </div>
        
    );
}
 
export default Error;