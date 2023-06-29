import {React} from 'react'
import AuthPage from './Pages/AuthPage';
import Employer from './Pages/EmployerPage';
import Jobseeker from './Pages/JobseekerPage';
import Landing from './Pages/Landing';
import { Routes,Route } from "react-router-dom";
import EmployerDetails from './Pages/Employer/Details';
import EmDashboard from './Pages/Employer/Dashboard'
import EmployerState from './context/Employer/EmployerState';
import JobPostingState from './context/Jobposting/JobPostingState'

function App() {
  return (
    <>
    <EmployerState>
      <JobPostingState>
        <Routes>
          <Route path="/" element={<Landing/>} exact/>
          <Route path="/employer" element={<Employer/>} exact/>
          <Route path="/jobseeker" element={<Jobseeker/>} exact/>
          <Route path="/employer/details" element={<EmployerDetails/>} exact/>
          <Route path="/addjob" element={<EmDashboard/>} exact/>
        </Routes>

      </JobPostingState>
    </EmployerState>
    </>
  );
}

export default App;
