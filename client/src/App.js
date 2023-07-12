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
import Connect from './Pages/Employer/Connect'
import JobApplications from './Pages/Employer/Applications';
import EmployerProfile from './components/Employer/DashComps/profile';
// Jobseeker imports
import Jobseeker from './Pages/Jobseeker/JobseekerPage';
import JobSeekerDetails from './Pages/Jobseeker/Details';
import JsDashboard from './Pages/Jobseeker/Dashboard'
import JobseekerState from './context/Jobseeker/JobseekerState'
import JobDetails from './Pages/Jobseeker/JobDetails'
import Jobapplied from './Pages/Jobseeker/JobsApplied';
import JobSeekerProfile from './components/Jobseeker/Dashcomps/profile';

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
            <Route path="/employers/dashboard" element={<EmDashboard/>} exact/>
            <Route path="/applications/:jobId" element={<JobApplications/>} exact/>
            <Route path="/connect/:id" element={<Connect/>} exact/>
            <Route path="/employer/profile" element={<EmployerProfile/>} exact/>
            {/* Jobseeker Routes */}
            <Route path="/candidate" element={<Jobseeker/>} exact/>
            <Route path="/candidate/details" element={<JobSeekerDetails/>} exact/>
            <Route path="/candidate/dashboard" element={<JsDashboard/>} exact/>
            <Route path="/fetch/:jobId" element={<JobDetails/>}/>
            <Route path="/candidate/job-applied" element={<Jobapplied/>} exact/>
            <Route path="/candidate/profile" element={<JobSeekerProfile/>} exact/>
          </Routes>

        </JobseekerState>
      </JobPostingState>
    </EmployerState>
    </>
  );
}

export default App;
