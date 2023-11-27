// BookingPage.tsx
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import InputCluster from '../components/InputCluster/InputCluster';
import { useState, useEffect } from 'react';
import { getAcaraList, getKursiList, bookKursi } from '../api';
import React from 'react';

const BookingPage: React.FC = () => {
  const [acaraList, setAcaraList] = useState<number[]>([]);
  const [selectedAcara, setSelectedAcara] = useState<number | null>(null);
  const [kursiList, setKursiList] = useState<number[]>([]);
  const [selectedKursi, setSelectedKursi] = useState<number | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch acara list
  const fetchAcaraList = async () => {
    try {
      const acaraData = await getAcaraList();
      setAcaraList(acaraData); 
      if (acaraData.length > 0) {
        setSelectedAcara(acaraData[0]); 
      }
    } catch (error) {
      console.error('Error fetching acara list:', error);
    }
  };

  // Fetch kursi list
  const fetchKursiList = async (acaraId: number) => {
    try {
      const kursiData = await getKursiList(acaraId);
      setKursiList(kursiData);
      if (kursiData.length > 0) {
        setSelectedKursi(kursiData[0]); 
      }
    } catch (error) {
      console.error('Error fetching kursi list:', error);
    }
  };

  useEffect(() => {
    fetchAcaraList();
  }, []);

  useEffect(() => {
    if (selectedAcara !== null) {
        fetchKursiList(selectedAcara);
      }
  }, [selectedAcara]);

  const handleRequestSuccess = () => {
    setRequestSuccess(true);
  };

  const handleBookKursi = async () => {
    if (selectedAcara === null || selectedKursi === null || email === '') {
      console.error('Please select acara and kursi and enter email');
      return;
    }
    //PERSENTASE FAIL BOOKING
    const shouldFail = Math.random() < 0.2;
    try {
      if (!shouldFail) {
        await bookKursi(selectedAcara, selectedKursi, 1, email);
        setErrorMessage(null); 
      } else {
        setErrorMessage('Pemanggilan Eksternal Gagal (fail booking)');
        setRequestSuccess(false); 
      }
      // booking history
      const historyResult = await fetch('http://localhost:5174/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kursi_id: selectedKursi,
          acara_id: selectedAcara,
          email,
          shouldFail, 
        }),
      });
  
      if (!historyResult.ok) {
        console.error('Error creating booking history');
        return;
      }

      handleRequestSuccess();
  
      if (!shouldFail) {
        handleRequestSuccess();
        setErrorMessage(null); 
      }
    } catch (error) {
      console.error('Error booking kursi:', error);
      setRequestSuccess(false);
    }
  };

  return (
    <div className="App">
      <Header title="Booking" />
      <div className='Content'>Booking ceritanya</div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
      <InputCluster
        buttonText='Send Request'
        serverURL='http://localhost:3100'
        onClick={handleBookKursi}
        acaraList={acaraList}
        selectedAcara={selectedAcara}
        onSelectAcara={setSelectedAcara}
        kursiList={kursiList}
        selectedKursi={selectedKursi}
        onSelectKursi={setSelectedKursi}
      />
      {errorMessage && (
        <div className='ErrorMessage' style={{ color: 'red' }}>{errorMessage}</div>
      )}
      {!errorMessage && requestSuccess && (
        <Link to="/payment" className='ButtonGeneric' style={{ marginTop: '10px' }}>
          Payment
        </Link>
      )}
      <Link to="/" className='ButtonGeneric' style={{ marginTop: '10px' }}>Back</Link>
    </div>
  );
};

export default BookingPage;