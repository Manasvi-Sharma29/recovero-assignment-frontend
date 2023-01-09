import React, { useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import "../Style/AddUser.css"



export default function AddUser() {
    // const {adminId} = useParams()
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [memberList, setMemberList] = useState([]);
    const navigate = useNavigate()

    const ViewMembers = async()=> {
      let adminId = JSON.parse(localStorage.getItem("adminid"));
      let obj = {
        url: `http://localhost:5000/getUsers/${adminId}`,
        method: "get",
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      };
    
      let result = await axios(obj)
      if(result){
        console.log(result.data.data)
        setMemberList(result.data.data)
      }else{
        alert('no member exist')
      }
    }

    const collectData = async ()=>{
        let adminId = JSON.parse(localStorage.getItem("adminid"))
        console.warn(title,name,phone,email,password,role)
        let obj = {
            method:'post',
            url:`http://localhost:5000/createUser/${adminId}`,
            data:{
                title,name,phone,email,password,role
            },
            headers:{
              authorization: JSON.parse(localStorage.getItem('token'))
            }
        }
        let result = await axios(obj)
        result = result.data.data
        console.log(result)
          ViewMembers()
    }

    const DeleteUser = async function (userId){
      let adminId = JSON.parse(localStorage.getItem("adminid"))
      let obj = {
          method:'delete',
          url:`http://localhost:5000/deleteUser/${adminId}/${userId}`,
          headers:{
            authorization: JSON.parse(localStorage.getItem('token'))
          }
      }
      let result = await axios(obj)
      if (result){
         
          ViewMembers()
      }
  }
      return (
        <>
        <form>
          <h1>Add An User</h1>
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
            Add
          </button>
        </form>
        <div className="member-list">
          <h2>List of all members</h2>
          {
            memberList.map((item)=>
            <ul>
              {item.title}. { }
              {item.name}<br/>
              {item.email}<br/>
              {item.password}<br/>
              {item.role}<br/>
              {item.phone}<br/>
              <button type="button"  id="deleteBtn">
              <img src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/1.2.3/src/icon-trash-a.svg"  onClick={()=>DeleteUser(item._id)}/>
          </button>
            </ul>
            )
          }
        </div>
        </>
        
      );
}