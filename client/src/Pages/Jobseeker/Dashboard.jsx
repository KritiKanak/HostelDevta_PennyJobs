import React from 'react'
import Navbar from '../../components/Navbar'
import FetchAllJobs from '../../components/Jobseeker/Dashcomps/fetchjobs'

const Dashboard = () => {
  return (
    <>

      <Navbar/>
      <h3>JOb seeker Dashboard</h3>
      <FetchAllJobs/>
    </>
  )
}

export default Dashboard