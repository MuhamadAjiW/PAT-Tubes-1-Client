// EditUserPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditUserPage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fetchUsers = () => {
    fetch('http://localhost:5174/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  };

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFullName(user.full_name);
    setEmail(user.email);
    setUsername(user.username);
    setPassword('');
  };

  // Add a new function to handle the delete click
  const handleDeleteClick = (userId) => {
		fetch(`http://localhost:5174/user?userId=${userId}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            // Refetch the users after the delete operation
            fetchUsers();
          });
      };

  const handleSaveClick = () => {
    if (selectedUser) {
      fetch(`http://localhost:5174/user?userId=${selectedUser.user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, username, password }),
      })
        .then(response => response.json())
        .then(data => {
          // Refetch the users after the save operation
          fetchUsers();
        });
    } else {
      console.error('No user selected');
    }
  };

  return (
    <div>
        <Link to="/" className='ButtonGeneric' style={{ marginTop: '10px' }}>Back</Link>
      <h1>Edit User</h1>
      {selectedUser && (
        <form>
          <label>
            Full Name:
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="button" onClick={handleSaveClick}>Save</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Is Admin?</th>
            <th>Edit</th>
						<th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.isadmin ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEditClick(user)}>Edit</button>
							</td>
							<td>
                <button onClick={() => handleDeleteClick(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditUserPage;