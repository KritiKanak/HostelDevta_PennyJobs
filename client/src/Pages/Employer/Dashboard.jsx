import React from 'react'
import Navbar from '../../components/Navbar'
import AddJob from '../../components/Employer/Jobpost/Addjob'
import PostFetch from '../../components/Employer/Jobpost/PostFetch'

const Dashboard = () => {
  return (
    <>
      <Navbar/>
      <AddJob/>
      <PostFetch/>
    </>
  )
}

export default Dashboard