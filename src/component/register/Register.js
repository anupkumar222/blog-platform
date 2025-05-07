'use client'
import React, { useState, useEffect } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      setMessageType('danger');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      setMessage('Username already exists. Please choose another.');
      setMessageType('danger');
      return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Registration successful! You can now login.');
    setMessageType('success');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <h3 className="mb-0">Register</h3>
            </div>
            <div className="card-body p-4">
              {message && (
                <div className={`alert alert-${messageType} mb-3`} role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleRegister}>
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
                      placeholder="Choose a username"
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
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg">
                    Register
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p className="mb-0">
                    Already have an account? <a href="/login" className="text-success">Login here</a>
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

export default Register;