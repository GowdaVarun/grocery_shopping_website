import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Mail, Lock, User } from 'lucide-react'
import './Login.css'

const Login = ({ onLogin, isAuthenticated }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!isLogin && !formData.name) {
      setError('Please enter your name');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simple login implementation using localStorage
    if (isLogin) {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('groceryUsers') || '[]');
      const user = users.find(user => user.email === formData.email);
      
      if (!user) {
        setError('Email not found. Please register first.');
        return;
      }
      
      if (user.password !== formData.password) {
        setError('Incorrect password');
        return;
      }
      
      onLogin({
        email: user.email,
        name: user.name,
        id: user.id
      });
      
      navigate('/');
    } else {
      // Registration
      const users = JSON.parse(localStorage.getItem('groceryUsers') || '[]');
      
      // Check if email already exists
      if (users.some(user => user.email === formData.email)) {
        setError('Email already registered. Please login.');
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        name: formData.name
      };
      
      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('groceryUsers', JSON.stringify(users));
      
      // Login the new user
      onLogin({
        email: newUser.email,
        name: newUser.name,
        id: newUser.id
      });
      
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">{isLogin ? 'Account Access' : 'Create Account'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="form-input" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {isLogin && (
              <div className="forgot-password">
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
            )}
            
            <div className="button-group">
              <button type="submit" className="login-button">
                {isLogin ? 'Login' : 'Register'}
              </button>
              <button 
                type="button" 
                className="register-button"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Create Account' : 'Back to Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login