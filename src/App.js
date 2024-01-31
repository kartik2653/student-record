import './App.css';
import React, { useState,useEffect } from 'react';
import Login from './assets/screens/Login';
import Dashboard from './assets/screens/Dashboard';
import Modal from './assets/components/Modal';
import Signup from './assets/screens/Signup';
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom';
import ErrorElement from './assets/screens/ErrorElement';
function App() {

  const[authorized,setAuthorized] = useState(false);
  const statusHandler = () =>{
    setAuthorized(true);
  }

  useEffect(()=>{
  JSON.parse(localStorage.getItem('token')) !== null ? setAuthorized(true) : setAuthorized(false);
  },[])



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
         <Route path='login' element={<Login/>}/>
         <Route path='signup' element={<Signup/>}/>
         <Route path='/' element = {<Dashboard/>}/>
         <Route path='*' element = {<ErrorElement/>}/>
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router}/>

    </div>
  );
}

export default App;
