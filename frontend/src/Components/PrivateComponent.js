import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

//Private component so that no component can be accessed until we atre signed up
export default function PrivateComponent(){
    let auth = localStorage.getItem('user')
    if(!auth)auth = localStorage.getItem('token')
    return auth?<Outlet/>:<Navigate to='/signup'/>
}