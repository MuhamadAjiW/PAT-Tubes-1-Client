import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import '../styles/styles.css'
import '../styles/buttons.css'

const HomePage: React.FC = () => {
  const [cookies, setCookie] = useCookies(['token']);
  const [feedback, setFeedback] = useState<string | null>(null);

  const generateCookie = () => {
    setCookie('token', Math.random().toString(36).substring(2, 15), { maxAge: 3600 }); // Expires in 1 hour
    setFeedback('New cookie generated and set');
    setTimeout(() => setFeedback(null), 2000); // Clear after 2 seconds
  };

  return (
    <div className="App">
      <Header title="Homepage"/>
      <div className='Content' style={{ marginBottom: '10px' }}>
        Yah ges jadi ini yu ai yu ex asal - asalannya ya ges
      </div>
      <Link to="/booking" className='ButtonGeneric'>Booking</Link>
      <button className='ButtonGeneric' onClick={generateCookie} style={{ marginLeft: "10px" }}>
        Simulate Login
      </button>

      <h3>
        <span style={{ color: 'red' }}>C</span>
        <span style={{ color: 'orange' }}>R</span>
        <span style={{ color: 'blue' }}>U</span>
        <span style={{ color: 'green' }}>D</span>
      </h3>
      <p>Asumsi ini admin bisa add edit dan delete user ya</p>

      <Link to="/register" className='ButtonGeneric' style={{ marginLeft: "10px" }}>Add User</Link>
      <Link to="/edit-users" className='ButtonGeneric' style={{ marginLeft: "10px" }}>Edit and Delete Users</Link>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default HomePage;