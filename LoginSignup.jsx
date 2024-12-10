import React, { useEffect, useState } from 'react';
import { Close, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import './LoginSignup.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const LoginSignup = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
  const [isResetPasswordActive, setIsResetPasswordActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();

  // Set form state based on URL
  useEffect(() => {
    document.body.style = `
    display: flex; 
    align-items: center; 
    justify-content: center; 
    min-height: 100vh; 
    background-color: white;
    `;
    
    // Check URL to determine if reset password form should be active
    if (location.pathname.includes('/reset-password/') && token) {
      setIsResetPasswordActive(true);
    }

    return () => { document.body.style = ''; };
  }, [token, location.pathname]);

  // Toggle between Sign Up and Sign In forms
  const toggleForm = () => setIsSignUpActive(!isSignUpActive);
  const handleClose = () => navigate('/');

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7800/api/users/register', { name, email, password });
      localStorage.setItem('authToken', response.data.token);
      navigate('/UserProfile');
    } catch (error) {
      setMessage('Error signing up. Please try again.');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7800/api/users/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      navigate(response.data.isAdmin ? '/admin' : '/UserProfile');
    } catch (error) {
      setMessage('Error logging in. Please try again.');
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7800/api/users/forgot-password', { email });
      setMessage('Password reset link sent to your email');
      setIsForgotPasswordActive(false);
    } catch (error) {
      setMessage('Failed to send reset link. Please try again.');
    }
  };

  // Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.put(`http://localhost:7800/api/users/reset-password/${token}`, { password });
      setMessage('Password reset successfully');
      navigate('/UserProfile');
    } catch (error) {
      setMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className={`container ${isSignUpActive ? 'active' : ''}`} id="container">
      <div className="close-icon" onClick={handleClose}>
        <Close style={{ color: '#505655', fontSize: '30px' }} />
      </div>

      {/* Sign Up / Sign In Form */}
      {!isForgotPasswordActive && !isResetPasswordActive && (
        <div className={`form-container ${isSignUpActive ? 'sign-up' : 'sign-in'}`}>
          <form onSubmit={isSignUpActive ? handleSignup : handleLogin}>
            <h1 style={{ color: '#505655' }}>{isSignUpActive ? 'Create Account' : 'Sign In'}</h1>
            <div className="social-icons">
              <a href="/" className="icon">
                <Google style={{ color: '#505655', fontSize: '30px' }} />
              </a>
            </div>
            <span>or use your email {isSignUpActive ? 'for registration' : 'account'}</span>
            {isSignUpActive && (
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            )}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="password-container">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            <span className="toggle-password-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
            </div>
            {!isSignUpActive && (
              <a href="/" onClick={(e) => { e.preventDefault(); setIsForgotPasswordActive(true); }}>Forgot Your Password?</a>
            )}
            <button type="submit">{isSignUpActive ? 'Sign Up' : 'Sign In'}</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {/* Forgot Password Form */}
      {isForgotPasswordActive && (
        <div className="form-container forgot-password">
          <form onSubmit={handleForgotPassword}>
            <h1 style={{ color: '#505655' }}>Forgot Password</h1>
            <span>Enter your email to receive a reset link</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Send Reset Link</button>
            <button className="back-button" onClick={() => setIsForgotPasswordActive(false)}>Back to Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {/* Reset Password Form */}
      {isResetPasswordActive && (
        <div className="form-container reset-password">
          <form onSubmit={handleResetPassword}>
            <h1 style={{ color: '#505655' }}>Reset Password</h1>
            <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Reset Password</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {/* Toggle Section */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1 style={{ color: '#EFECEC' }}>Welcome Back!</h1>
            <p style={{ color: '#EFECEC' }}>To keep connected, please log in.</p>
            <button className="hidden" id="login" onClick={toggleForm}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 style={{ color: '#EFECEC' }}>Hello, Friend!</h1>
            <p style={{ color: '#EFECEC' }}>Sign up to start your journey with us.</p>
            <button className="hidden" id="register" onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
