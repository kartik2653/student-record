import React from 'react';
import './styles.css';
const Modal = ({confirmDelete}) => {
    // ui --> https://ui-patterns.com/patterns/modal-windows/examples/16840
    return (
        <div>
        <div className='overlay'  ></div>
        <div className='modalOuterContainer' onClick={(e)=>e.target.className === 'modalOuterContainer' && confirmDelete(false)}>  
            <div className='modalContainer'>
                <div style={{width:'80%',margin:'auto',lineHeight:'30px'}}>
                <p className='title1'>Do you want to delete the record ?</p>
                </div>
                <div className='buttonContainer1'>
                    <button className='successButton1 failureButton1' onClick={()=>confirmDelete(false)}>No</button>
                    <button className='successButton1' onClick={()=>confirmDelete(true)}>Yes</button>
                </div>
            </div>
            
        </div>  
            
        </div>
    );
}
 
export default Modal