'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      setMessageType('danger');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setMessage('Login successful!');
      setMessageType('success');
      localStorage.setItem('loggedInUser', username);
      setUser(username)
      router.push('/blog');
    } else {
      setMessage('Invalid username or password.');
      setMessageType('danger');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Login</h3>
            </div>
            <div className="card-body p-4">
              {message && (
                <div className={`alert alert-${messageType} mb-3`} role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p className="mb-0">
                    Don't have an account? <a href="/register" className="text-primary">Register here</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;