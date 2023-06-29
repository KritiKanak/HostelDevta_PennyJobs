import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Job Portal</h1>
      <Link to="/employer" className="button">Employer</Link>
      <Link to="/jobseeker" className="button">Jobseeker</Link>
    </div>
  );
}

export default HomePage;
