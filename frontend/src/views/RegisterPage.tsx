// RegisterPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5174/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, username }),
      });

      if (response.ok) {
        // Registration was successful
        setSuccessMessage('User successfully created!');
        setErrorMessage(''); // Clear any previous error message
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Set the error message
      }
    } catch (error) {
      // Handle error
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleRegister}>
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      <Link to="/" className='ButtonGeneric' style={{ marginTop: '10px' }}>Back</Link>
    </div>
  );
};

export default RegisterPage;