// BookingPage.tsx
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import InputCluster from '../components/InputCluster/InputCluster';
import { useState, useEffect } from 'react';
import { getAcaraList, getKursiList, bookKursi } from '../api';

const BookingPage: React.FC = () => {
  const [acaraList, setAcaraList] = useState<string[]>([]);
  const [selectedAcara, setSelectedAcara] = useState<string | null>(null);
  const [kursiList, setKursiList] = useState<number[]>([]);
  const [selectedKursi, setSelectedKursi] = useState<number | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Fetch acara list
    const fetchAcaraList = async () => {
      try {
        const acaraData = await getAcaraList();
        setAcaraList(acaraData);
      } catch (error) {
        console.error('Error fetching acara list:', error);
      }
    };

    // Fetch kursi list
    const fetchKursiList = async () => {
      try {
        const kursiData = await getKursiList();
        setKursiList(kursiData);
      } catch (error) {
        console.error('Error fetching kursi list:', error);
      }
    };

    fetchAcaraList();
    fetchKursiList();
  }, []);

  const handleRequestSuccess = () => {
    setRequestSuccess(true);
  };

  const handleBookKursi = async () => {
    if (selectedAcara === null || selectedKursi === null) {
      console.error('Please select acara and kursi');
      return;
    }
    try {
      const acaraId = parseInt(selectedAcara, 10); // Convert selectedAcara to number
      await bookKursi(acaraId, selectedKursi, 1);
      handleRequestSuccess();
    } catch (error) {
      console.error('Error booking kursi:', error);
    }
  };


  return (
    <div className="App">
      <Header title="Booking" />
      <div className='Content'>Booking ceritanya</div>
      <InputCluster
        buttonText='Send Request'
        serverURL='http://localhost:3100'
        onClick={handleBookKursi}
        onRequestSuccess={() => handleRequestSuccess()}
        acaraList={acaraList}
        selectedAcara={selectedAcara}
        onSelectAcara={setSelectedAcara}
        kursiList={kursiList}
        selectedKursi={selectedKursi}
        onSelectKursi={setSelectedKursi}
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
