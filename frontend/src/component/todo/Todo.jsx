import React from "react";
import { useState, useEffect } from "react";
import "./Todo.css";
import TodoCard from "./TodoCard.jsx";
import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index.js";
import axios from "axios";

let id = sessionStorage.getItem("id");
let toUpdateArray=[];
const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
    document.getElementById("add").style.display = "block";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("title or body should not be empty!");
    } else {
      if (id) {
        await axios
          .post(`${window.location.origin}/api/v2/addTask`, {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        setInputs({ title: "", body: "" });
        toast.success("Your Task is added!");
      } else {
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task is added!");
      }
    }
  };
  const del = async (Cardid) => {
    if (id) {
      await axios
        .delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`, {
          data: { id: id },
        })
        .then(() => {
          toast.success("Your Task is Deleted!");
        });
    }
    else{
        toast.success("Please Sign Up first.");
    }
  };
  const dis = (value) => {
    console.log(value);
    document.getElementById("update-task").style.display = value;
  };
  const update=(value)=>{
    toUpdateArray=Array[value];
    
  };

  useEffect(() => {
    if(id){
      const fetch = async () => {
      await axios
        .get(`${window.location.origin}/api/v2/getTask/${id}`)
        .then((response) => {
          setArray(response.data.list);
        });
      };
      fetch();
    }
    
  }, [submit]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
          <div className="w-50 d-flex flex-column todo-inputs-div ">
            <input
              type="text"
              placeholder="Title"
              className="my-3 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              type="text"
              placeholder="body"
              className="p-2 todo-inputs"
              id="textarea"
              name="body"
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-center align-items-center add-div my-3">
            <button className="w-100 add-btn p-2 " id="add" onClick={submit}>
              add
            </button>
          </div>
        </div>
        <div className="todo body ">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                    <TodoCard
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delId={del}
                      display={dis}
                      updateid={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="todo-update" id="update-task">
          <div className="container">
            <Update display={dis} update={toUpdateArray} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
