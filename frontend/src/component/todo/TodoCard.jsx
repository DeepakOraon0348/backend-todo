import React from 'react';
import "./Todo.css"
import { MdDelete } from "react-icons/md";
import { MdSystemUpdateAlt } from "react-icons/md";

const TodoCard = ({title, body, id, delId, display, updateid,toBeUpdate }) => {
  return (
    <div className='p-3 todo-card'>
      <div className='todo-card-p'>
        <h5>{title}</h5>
        <p>{body.split("",77)}...</p>
      </div>
      <div className='d-flex justify-content-around'>
          <div className='btn-div del p-1' 
          onClick={()=>(
            delId(id)
          )}>
            <MdDelete className='card-icons'/>delete
          </div>
          <div className='btn-div p-1 bg-primary' onClick={()=>{
            display("block");  
            toBeUpdate(updateid);
            
            }}>
            <MdSystemUpdateAlt className='card-icons'/>update
          </div>
      </div>
    </div>
  )
}

export default TodoCard