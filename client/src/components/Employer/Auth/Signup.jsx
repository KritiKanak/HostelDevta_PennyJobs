import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployerSignUp = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const host = 'http://127.0.0.1:5000';

  const handleRegistration = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (!name || !email || !password || !cpassword) {
      setError('Please fill in all the fields');
      return;
    }

    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${host}/api/auth/employer/createuser`, {
        name,
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem('token', response.data.authtoken);
        navigate('/employer/details'); // Redirect to the employer details page
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-4">
          <h2 className="my-2">Employer Registration</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleRegistration}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleChange}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
                required
                minLength={5}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                onChange={handleChange}
                required
                minLength={5}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignUp;
