import React,{useEffect, useState} from "react";
import '../Style/Login.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  useEffect(()=>{
    const auth = localStorage.getItem('token')
    if(auth){
      navigate('/')
    }
  })

  const handleLogin = async (event)=>{
    event.preventDefault()
    console.log(email,password)
    let obj = {
        method:'post',
        url:'http://localhost:5000/login',
        data:{
            email,password
        }
    }
    const result = await axios(obj)
    console.warn(result.data)
    if(!result.data){
        alert('failed')
    }
    if(result){
        localStorage.setItem("token",JSON.stringify(result.data.data.token))
      navigate('/')
    }
  }
  return (
    <form className="loginInput">
      <h1 id="login">Login</h1>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="InputEmail"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="InputPassword"
          placeholder="Password"
        />
      </div>
      <button type="submit" onClick = {handleLogin} className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
