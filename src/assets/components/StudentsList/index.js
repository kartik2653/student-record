import React, { useState, useEffect, Fragment } from 'react';
import editImage from '../../images/edit.png';
import deleteLogo from '../../images/delete.png';
import './styles.css';
import Modal from '../Modal';
const StudentsList = ({data,dataChanged,edit,toggleModal,addStudent}) => {
    

    const[showModal,setShowModal] = useState(false);
    const[activeRollNo,setActiveRollNo] = useState(-1);
    const[activeStorageType,setActiveStorageType] = useState('');
    const[addStudentModal, setAddStudentModal] = useState(false);

    const deleteStudent = (rollNo,storageType) =>{
       if(storageType === 'Local Storage'){
        const newData = data.filter((row) => row.storageType === 'Local Storage' && row.rollNo !== rollNo);
        localStorage.setItem("data",JSON.stringify(newData));
       }
       else if(storageType === 'Cookies'){
        const newData = data.filter((row) => row.storageType === 'Cookies' && row.rollNo !== rollNo);
        document.cookie = `data = ${JSON.stringify(newData)}`;
       }
       else{
        const newData = data.filter((row) => row.storageType === 'Session Storage' && row.rollNo !== rollNo);
        sessionStorage.setItem("data",JSON.stringify(newData));
       }
      dataChanged();
    }

    const performDelete = (rollNo,storageType) =>{
        setActiveRollNo(rollNo);
        setActiveStorageType(storageType);
        setShowModal(true);
    }

    const confirmDelete = (shouldDelete) =>{
      setShowModal(false);
       if(shouldDelete)deleteStudent(activeRollNo,activeStorageType);
    }


    const rows = data.map((row,index,arr)=>{
        return(
            <tr key={index}>
                <td>{row.rollNo}</td>
                <td>{row.firstName +" "+ row.lastName}</td>
                <td>{row.subject}</td>
                <td>{row.storageType}</td>
                <td>
                    <div style={{display:'flex',flexDirection:'row'}}>
                            <div 
                            onClick={()=>edit(row)}
                            style={{width:'20px',height:'20px',margin:'auto',cursor:'pointer'}}>
                                <img src={editImage} alt='Edit' style={{width:'100%',aspectRatio:'auto'}}/>
                            </div>
                            <div 
                            onClick={()=>performDelete(row.rollNo,row.storageType)}
                            style={{width:'20px',height:'20px',margin:'auto',cursor:'pointer'}}>
                            <img src={deleteLogo} alt='Delete' style={{width:'100%',aspectRatio:'auto'}}/>
                        </div>
                    </div>
                    
                </td>
            </tr>
        );
    })

    return (
        <div style={{width:'100%',backgroundColor:'#F2F2F4'}}>
            {/* Name, subject, roll no., Storage type(Dropdown)  */}
             
                
                <button className='addButton' onClick={() => addStudent()}> New Student </button>
                <table style={{width:'80%',margin:'auto',marginTop:'50px',border:'1px solid #E5E8EF',backgroundColor:'#fff',boxShadow:'3px 3px 3px #ECEEF0 , -3px -3px 3px #ECEEF0 ',borderRadius:'8px'}}>
                <thead style={{backgroundColor:'#EDEFF2'}}>  
                <tr>
                    <th style={{fontFamily:'Montserrat',padding:'25px 0px'}}>Roll No</th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Storage type</th>
                    <th>Action</th>
                </tr>
                </thead>  
                <tbody>
               {rows}
               </tbody>
             </table>
             
             {showModal && <Modal confirmDelete = {confirmDelete}/>}
             
             {/* {
                showModal && <Modal confirmDelete = {confirmDelete}/>
             } */}

             
        </div>
    );
}
 
export default StudentsList;