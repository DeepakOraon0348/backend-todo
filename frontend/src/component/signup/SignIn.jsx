import React from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const SignIn = () => {
  const dispatch=useDispatch();
  const history=useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${window.location.origin}/api/v1/signin`, Inputs, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            sessionStorage.setItem("id",response.data.others._id);
            setInputs({
                email:"",
                password:"",
            });
            dispatch(authActions.login());
            history("/todo")
        //   if (response.data.message === "User already exists") {
        //     alert(response.data.message);
        //   } else {
        //     alert(response.data.message);
        //     setInputs({
        //       email: "",
        //       password: "",
        //     });
            //history("/signin");
          //}
        });
    } catch (err) {
      console.error("POST error:", err.response?.data || err.message);
    }
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col d-flex h-100vh justify-content-center align-items-center">
            <div className=" d-flex flex-column p-2 w-100 p-3">
              <input
                className="p-2 my-2 sign-up"
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={change}
                value={Inputs.email}
              />
              {/* <input
                className="p-2 my-2 sign-up"
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={change}
                value={Inputs.username}
              /> */}
              <input
                className="p-2 my-2 sign-up"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={change}
                value={Inputs.password}
              />
              <button className="btn-sign-up p-2" onClick={submit}>Sign In</button>
            </div>
          </div>
          <div className=" col-lg-4 h-100vh col col-left d-lg-flex justify-content-center align-items-center d-lg-block d-none">
            <HeadingComp first="Sign" second="In" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
