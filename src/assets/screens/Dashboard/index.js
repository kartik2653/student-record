import React,{useState,useEffect} from 'react';
import './styles.css';
import StudentsList from '../../components/StudentsList';
import AddStudent from '../../components/AddStudent';
import { Navigate } from 'react-router-dom';
const Dashboard = () => {

   
    const [data , setData] = useState([]);
    const[selectedStudent,setSelectedStudent] = useState({rollNo:-1,firstName:'',lastName:'',storageType:'Local Storage',subject:''});
    const [isAdding,setAdding] = useState(false);
    const[modalVisible , setModalVisible] = useState(false);
    const[isAuthorized,setAuthorized] = useState(true);

    const getAdminStatus = () =>{
        const token = localStorage.getItem('token');
        console.log("token",token);
        if(token){
            setAuthorized(true);
        }else{
            setAuthorized(false);
        }
    }

    const getDataFromCookies = () =>{
        const localData = document.cookie;
        if(localData.length === 0)return [];

        const subStr = localData.split('=')[1];
        const arr = JSON.parse(subStr);
        return arr;
    }

    const getDataFromDatabase = () =>{
        const localStorageData = JSON.parse(localStorage.getItem('data')) === null ? [] :JSON.parse(localStorage.getItem('data'));
        const sessionData = JSON.parse(sessionStorage.getItem('data')) === null ? [] :JSON.parse(sessionStorage.getItem('data'));
        const cookiesData = getDataFromCookies(); 
        setData(()=>[...localStorageData,...sessionData,...cookiesData]);
    }

    const setDataToDatabase = (student) =>{
        const tempStorage = student.storageType;
        if(tempStorage === 'Cookies'){
            const prevData = getDataFromCookies();
            const tempData = [...prevData,student];
            document.cookie = `data = ${JSON.stringify(tempData)}`;
            getDataFromDatabase();
        }
        else if(tempStorage === 'Local Storage'){
            const prevData = localStorage.getItem("data") === null ? [] : JSON.parse(localStorage.getItem("data")); 
            const tempData = [...prevData,student];
            localStorage.setItem("data",JSON.stringify(tempData));
            getDataFromDatabase();
        }
        else{
            const prevData = sessionStorage.getItem("data") === null ? [] : JSON.parse(sessionStorage.getItem("data")); 
            const tempData = [...prevData,student];
            sessionStorage.setItem("data",JSON.stringify(tempData)); 
            getDataFromDatabase();
        }
    }

    const addStudent = () =>{
        setSelectedStudent({rollNo:-1,firstName:'',lastName:'',storageType:'Local Storage',subject:''});
        setAdding(true);
    }

    const toggleAdding = () =>{
        setAdding((prev)=>!prev);
    }

    const editStudent = (student) =>{
      setSelectedStudent({...student});  
      toggleAdding(); 
    }

    const toggleModalVisibility = () =>{
        setModalVisible((prev) => !prev);
    }

    useEffect(()=>{
        getAdminStatus();
        getDataFromDatabase();
    },[]);






    return (
        <div className='container'>
            {!isAuthorized && <Navigate to={'login'} replace={true}/>}
            <StudentsList data = {data} dataChanged = {getDataFromDatabase} edit = {editStudent} toggleModal = {toggleModalVisibility} addStudent={addStudent}/>
            {isAdding && 
            <>
            <div className='overlay'></div>
            <AddStudent toggleAdding = {toggleAdding} addToDatabase = {setDataToDatabase} data = {data} defaultStudent = {selectedStudent} dataChanged = {getDataFromDatabase}/>
            </>
            }
        </div>
    );
}
 
export default Dashboard;


// const getDataFromLocalStorage = () =>{
//     const localData = JSON.parse(localStorage.getItem('data')); 
//     console.log(data);
//     if(localData){
//         setStorageData(() => [...localData]);
//         setData((prev) => {
//             const arr = [...localData,...cookiesData,...sessionData];
//             console.log(arr);
//             return   arr;
//            });
//     } 
// }
// const getDataFromSessionStorage = () =>{
//    const localData = JSON.parse(sessionStorage.getItem('data'));
//    if(localData){
//     setSessionData((prev)=>[...localData]);
//     setData((prev) => {
//         console.log("Storage",storageData);
//      return   [...storageData,...cookiesData,...localData]
//     });
//  }
// }