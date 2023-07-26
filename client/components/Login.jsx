import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import * as Yup from 'yup';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const registrationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        await registrationSchema.validate({ username, email, password });
        const response = await axios.post('http://localhost:8082/register', {
          username,
          email,
          password,
        });
        if (response.status === 200) {
          // Registration successful, handle accordingly
          setRegistrationSuccess(true);
          console.log('User registered successfully.');
        } else {
          setErrorMessage('Error registering user.');
        }
      } else {
        await loginSchema.validate({ username, password });
        const response = await axios.post('http://localhost:8082/login', {
          username,
          password,
        });
        if (response.data === 'Login successful.') {
          // Login successful, handle accordingly
          console.log('Login successful.');
          navigate('http://localhost/sns/user/'); // Redirect to the Home component
        } else {
          setErrorMessage('Invalid credentials.');
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Handle validation errors
        const errorMessages = error.inner.map((err) => err.message);
        setErrorMessage(errorMessages.join(' '));
      } else {
        console.log(error);
        setErrorMessage('Error logging in.');
      }
    }

    // Reset the form
    setUsername('');
    setPassword('');
    setEmail('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleFormToggle = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage('');
  };

  return (
     <div className="login-container">
      <h1>HELLO AGAIN!</h1>

      <h2 className="login-title">{isRegistering ? 'Register' : 'Login'} Page</h2>
      {registrationSuccess ? (
        <React.Fragment>
          <p className="success-message">User registered successfully. You can now login.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Login</button>
          </form>
        </React.Fragment>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          {isRegistering && (
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        </form>
      )}
      <p>
        {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
        <button onClick={handleFormToggle}>{isRegistering ? 'Login' : 'Register'}</button>
      </p>
    </div>
  );
}

export default Login;

