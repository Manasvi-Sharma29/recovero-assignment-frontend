import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import "../Style/SignUp.css";
import axios from 'axios'


export default function SignUp() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  const navigate = useNavigate()
  useEffect(()=>{
    let auth = localStorage.getItem('user') 
    if(!auth)
      auth = localStorage.getItem('token') 
    if(auth){
      navigate('/')
    }
  },[])

  const collectData = async ()=>{
    console.warn(title,name,phone,email,password,role)
    let obj = {
        method:'post',
        url:'http://localhost:5000/register',
        data:{
            title,name,phone,email,password,role
        }
    }
    const result = await axios(obj)
    console.log(result.data)
    localStorage.setItem("token",JSON.stringify(result.data.data.token))
    localStorage.setItem("name",JSON.stringify(result.data.data.name))
    localStorage.setItem("adminid",JSON.stringify(result.data.data.adminId))
    if(result){
      navigate('/')
    }
    // let result = await fetch('http://localhost:5000/register',{
    //   method:'post',
    //   body:JSON.stringify({title,name,phone,email,password,street,city,pincode}),
    //   headers:{
    //     'Content-Type':'application/json'
    //   }
    // })
    // result = await result.json()
    // console.warn(result)
  }
  return (
    <form>
      <h1>Sign Up</h1>
      <div className="form-row">
        <div className="form-group col-md-4">
          <select 
          id="inputTitle" 
          value={title}
            onChange={(e)=>setTitle(e.target.value)}
          className="form-control">
            <option selected>Title</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="inputName"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="inputPhone"
            placeholder="Phone Number"
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="inputEmail4"
            placeholder="Email"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="inputPassword4"
            placeholder="Password"
          />
        </div>
      </div>
      {/* <label className="address">Address</label> */}
      <div className="form-row">
        <div className="form-group col-md-6">
          <select 
          id="inputRole" 
          value={role}
            onChange={(e)=>setRole(e.target.value)}
          className="form-control">
            <option selected>Role</option>
            <option>admin</option>
            <option>member</option>
          </select>
        </div>
      </div>
      <button type="button" onClick={collectData} className="btn btn-primary" id="submitBtn">
        Sign Up
      </button>
    </form>
  );
}
