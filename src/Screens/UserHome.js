import React from 'react'
import { Link } from 'react-router-dom'

const UserHome = () => {
  return (
    <div id='user-dashboard-cont'>
      <h1 className='text-center my-4'>User Dashboard</h1>
      <div className='userButtons d-flex justify-content-center my-2'>
      <Link to='/UserPanel' ><button type="button" className="btn btn-success mx-2">Upload</button></Link>
      <Link to='/Viewpastuploads'><button type="button" className="btn btn-success mx-2">View Past Uploads</button></Link>

      </div>
    </div>
  )
}

export default UserHome