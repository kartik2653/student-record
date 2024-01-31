import React,{useState,useEffect,useRef} from 'react';
import Input from '../Input';
import './styles.css'
import Error from '../Error';
const AddStudent = ({toggleAdding,addToDatabase,data,defaultStudent,dataChanged}) => {
    
    

    const[firstName,setFirstName] = useState(defaultStudent.firstName);
    const[lastName,setLastName] = useState(defaultStudent.lastName);
    const[rollNo,setRollNo] = useState(defaultStudent.rollNo);
    const[subject,setSubject] = useState(defaultStudent.subject);
    const[storageType,setStorageType] = useState(defaultStudent.storageType);
    const[isError,setError] = useState(false);
    const[errorMessage , setErrorMessage] = useState('');


    
    const ref = useRef(null);
    const setValue = (value,key) =>{
        switch (key){
            case 2 :{
                setFirstName(value);
                break;
            }

            case 3 :{
                setLastName(value);
                break;
            }

            case 1 :{
                setRollNo(value);
                break;
            }

            case 4 :{
                setSubject(value);
                break;
            }

            case 5 :{
                setStorageType(value);
                break;
            }

            default :{}
        }
    }

    const isUnique = () =>{

        if(defaultStudent.rollNo !== -1){
            if(defaultStudent.rollNo === rollNo)return true;
        }
        const newData = data;
        for(let i = 0;i < newData.length ;i++){
            if(newData[i].rollNo === rollNo)return false;
        }
        return true;
    }

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

    const addStudent = () =>{
        
      

        if(rollNo <= 0 ){
            setError(true);
            setErrorMessage("Roll no is invalid");   
        }
        else if(!isUnique()){
            setError(true);
            setErrorMessage("Roll no already exists");
        }
        else if(firstName.length < 3){
            setError(true);
            setErrorMessage("First name must be of at least 3 characters");
        }
        else if(lastName.length < 3){
            setError(true);
            setErrorMessage("Last name must be of at least 3 characters"); 
        }
        else if(subject.length < 1){
            setError(true);
            setErrorMessage("Enter a valid subject name"); 
        }
        else{
            if(defaultStudent.rollNo !== -1){
                deleteStudent(defaultStudent.rollNo,defaultStudent.storageType);
            }
            const student = {
             rollNo,
             firstName,
             lastName,
             subject,
             storageType,
            }
          
            addToDatabase(student);
            toggleAdding();
        }
    }

    const openDropdown = () =>{
      ref.current.focus();
    }



    return (
        <div className='myContainer' onClick={(e)=>{e.target.className === 'myContainer' && toggleAdding()}}>
            <div className='innerContainer'>
        <form>
            <Input placeholder='Roll No' type='number' onChange={setValue} flag={1} isLogin={true} defaultValue = {rollNo === -1 ? '' :rollNo} />
            <Input placeholder='First name' type='text' onChange={setValue} flag={2} isLogin={true} defaultValue = {firstName}/>
            <Input placeholder='Last name' type='text' onChange={setValue} flag={3} isLogin={true} defaultValue = {lastName}/>
            <Input placeholder='Subject' type='text' onChange={setValue} flag={4} isLogin={true} defaultValue = {subject}/>
            <div>
            <select 
             value={storageType} 
             name='storageType' 
             ref={ref} 
             className='storageTypeContainer'
             style={{fontFamily:'Montserrat'}}
             onChange={(e)=>setValue(e.target.value,5)}
            >
                <option>Local Storage</option>
                <option>Session Storage</option>
                <option>Cookies</option>
            </select>
            </div>
            
            
            <div className='buttonContainer'>
             <button type='button' className='button closeButton' onClick={(e)=>{e.preventDefault();e.stopPropagation();toggleAdding()}}>Close </button>
             <button type='button' className='button' onClick={(e)=>{e.preventDefault();e.stopPropagation();addStudent()}}> Save </button>
            </div>
            {isError && <Error message={[errorMessage]}/>}
            
        </form>
        </div>
        </div>
    );
}
 
export default AddStudent;
