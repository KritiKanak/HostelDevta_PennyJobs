// General imports
import {React} from 'react'
import { Routes,Route } from "react-router-dom";
import Landing from './Pages/Landing';
// Employer imports
import Employer from './Pages/Employer/EmployerPage';
import EmployerState from './context/Employer/EmployerState';
import EmployerDetails from './Pages/Employer/Details';
import EmDashboard from './Pages/Employer/Dashboard'
import JobPostingState from './context/Jobposting/JobPostingState'
// Jobseeker imports
import Jobseeker from './Pages/Jobseeker/JobseekerPage';
import JobSeekerDetails from './Pages/Jobseeker/Details';
import JsDashboard from './Pages/Jobseeker/Dashboard'
import JobseekerState from './context/Jobseeker/JobseekerState'
import JobDetails from './Pages/Jobseeker/JobDetails'
import Jobapplied from './Pages/Jobseeker/JobsApplied';
import JobApplications from './Pages/Employer/Applications';
import Connect from './Pages/Employer/Connect'

function App() {
  return (
    <>
    <EmployerState>
      <JobPostingState>
        <JobseekerState>
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Landing/>} exact/>
            {/* Employer Routes */}
            <Route path="/employer" element={<Employer/>} exact/>
            <Route path="/employer/details" element={<EmployerDetails/>} exact/>
            <Route path="/addjob" element={<EmDashboard/>} exact/>
            {/* Jobseeker Routes */}
            <Route path="/jobseeker" element={<Jobseeker/>} exact/>
            <Route path="/jobseeker/details" element={<JobSeekerDetails/>} exact/>
            <Route path="/jobseeker/dashboard" element={<JsDashboard/>} exact/>
            <Route path="/fetch/:jobId" element={<JobDetails/>}/>
            <Route path="/job-applied" element={<Jobapplied/>} exact/>
            <Route path="/applications/:jobId" element={<JobApplications/>} exact/>
            <Route path="/connect/:id" element={<Connect/>} exact/>
          </Routes>

        </JobseekerState>
      </JobPostingState>
    </EmployerState>
    </>
  );
}

export default App;
