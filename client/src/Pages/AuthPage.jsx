import React, { useState } from 'react';
import LoginEm from '../components/Employer/Auth/Login';
import SignupEm from '../components/Employer/Auth/Signup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <LoginEm/> : <SignupEm />}
      <button onClick={toggleForm}>
        {isLogin ? 'Create an Account' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default AuthPage;
