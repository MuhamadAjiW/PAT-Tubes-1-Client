import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import InputCluster from '../components/InputCluster/InputCluster';
import { useState } from 'react';

const BookingPage: React.FC = () => {
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

  const handleRequestSuccess = () => {
    setRequestSuccess(true);
  };

  return (
    <div className="App">
      <Header title="Booking"/>
      <div className='Content'>Booking ceritanya</div>
      <InputCluster
        placeholder='Booking'
        buttonText='Send Request'
        serverURL='http://localhost:8080'
        onRequestSuccess={handleRequestSuccess}
        />
      {requestSuccess && (
        <Link to="/payment" className='ButtonGeneric' style={{ marginTop: '10px' }}>
          Payment
        </Link>
      )}
      <Link to="/" className='ButtonGeneric' style={{ marginTop: '10px' }}>Back</Link>
    </div>
  );
};

export default BookingPage;