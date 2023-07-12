import React, { useState } from 'react';
import Footer from '../../components/Footer';
import LoginJs from '../../components/Jobseeker/Auth/Login';
import SignupJs from '../../components/Jobseeker/Auth/Signup';
import Navbar from '../../components/Jobseeker/Navbar'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Navbar/>
      <div>
        {isLogin ? <LoginJs/> : <SignupJs />}
        <button onClick={toggleForm}>
          {isLogin ? 'Create an Account' : 'Already have an account?'}
        </button>
      </div>
      <Footer/>
    </>
  );
};

export default AuthPage;
