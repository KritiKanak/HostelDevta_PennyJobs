import React, { useState } from 'react';
import LoginJs from '../../components/Jobseeker/Auth/Login';
import SignupJs from '../../components/Jobseeker/Auth/Signup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <LoginJs/> : <SignupJs />}
      <button onClick={toggleForm}>
        {isLogin ? 'Create an Account' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default AuthPage;
