// BookingPage.tsx
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import InputCluster from '../components/InputCluster/InputCluster';
import { useState } from 'react';
import { bookKursi } from '../api'; 

const BookingPage: React.FC = () => {
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

  const handleRequestSuccess = () => {
    setRequestSuccess(true);
  };

  const handleBookKursi = async () => {
    const acaraId = 1;
    const kursiId = 1;
    const userId = 1;

    try {
      await bookKursi(acaraId, kursiId, userId);
      handleRequestSuccess(); // Update state on success
    } catch (error) {
      console.error('Error booking kursi:', error);
    }
  };
  
  return (
    <div className="App">
      <Header title="Booking" />
      <div className='Content'>Booking ceritanya</div>
      <InputCluster
        placeholder='Booking'
        buttonText='Send Request'
        serverURL='http://localhost:3100'
        onClick={handleBookKursi} 
        onRequestSuccess={() => handleRequestSuccess()} 
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