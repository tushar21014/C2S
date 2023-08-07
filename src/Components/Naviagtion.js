import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {BsPerson} from "react-icons/bs"
import {IoPersonCircleSharp} from "react-icons/io5"

const Naviagtion = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand mx-4" >C2S</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul className="navbar-nav mr-auto" style={{justifyContent:"center",alignItems:"center"}}>
            <li className="nav-item active">
              <Link className="nav-link" >Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" >Link</Link>
            </li>
            {/* <li style={{display:'flex', width:'85vw', justifyContent:'end'}}>
              <button onClick={handleLogout} className='btn btn-danger'>LogOut</button>
            </li> */}
            <li className="nav-item" style={{marginLeft:"80vw"}}>
              <Link to='/MyProfile' className="nav-link mx-2" style={{fontSize:"24px", display:"flex",justifyContent:"center",alignItems:"center"}} ><IoPersonCircleSharp/></Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Naviagtion