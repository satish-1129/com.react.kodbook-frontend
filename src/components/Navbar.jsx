import React from 'react'
import { NavLink } from 'react-router-dom'; 

export default function Navbar() {
  const username = sessionStorage.getItem('username');
  return (
    <>
        <nav>
            Welcome {username}
            <NavLink to="/home"> News feed </NavLink>
            <NavLink to="/openNewPost"> New post </NavLink>
            <NavLink to="/openProfile"> My profile </NavLink>
            <NavLink to="/openEditProfile"> Edit profile </NavLink>

            <button>LOGOUT</button>
        </nav>
    </>
  )
}
 