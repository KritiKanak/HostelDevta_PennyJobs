import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login/> : <Signup />}
      <button onClick={toggleForm}>
        {isLogin ? 'Create an Account' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default AuthPage;
