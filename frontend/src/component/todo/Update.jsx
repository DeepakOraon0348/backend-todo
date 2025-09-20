import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Update = ({display,update}) => {
  useEffect(() => {
    setInputs({
      title:update.title, 
      body:update.body,
    });
  }, [update])
  
  const [Inputs, setInputs] = useState({
    title:"", 
    body:"",
  });
  const change=(e)=>{
    const {name, value} = e.target;
    setInputs({...Inputs,[name]:value});
  }
  const submit=async()=>{
    
    // console.log("update object:", update);
    // console.log("id to send:", update?._id);


    await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`, Inputs)
    .then((response)=>{
      toast.success("Your Task is Updated!");
    });
    display("none");
  }
  return (
    <div className='d-flex flex-column p-10 justify-content-center align-items-start'>

        <h1 className=''>Update Your Task</h1>
        <input 
        type="text" 
        placeholder='Title' 
        className='input-field' 
        value={Inputs.title?? ""}
        name='title' 
        onChange={change} 
        />
        <textarea  
        placeholder='Body' 
        id="" 
        className='input-field'
        value={Inputs.body?? ""}
        name="body" 
        onChange={change} 
        />
        <div className='update-btn-div d-flex flex-row'>
            <button className='update-btn' onClick={ submit }>Update</button>
            <button className='close-btn mx-12' onClick={()=>{display("none")} }>close</button>
        </div>
    </div>
  )
}

export default Update