// BookingPage.tsx
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

  // Fetch acara list
  const fetchAcaraList = async () => {
    try {
      const acaraData = await getAcaraList();
      setAcaraList(acaraData); // Set acaraList to acaraData
      if (acaraData.length > 0) {
        setSelectedAcara(acaraData[0]); // Set selectedAcara to the first item in acaraData
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
        setSelectedKursi(kursiData[0]); // Set selectedKursi to the first item in kursiData
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
    if (selectedAcara === null || selectedKursi === null) {
      console.error('Please select acara and kursi');
      console.log('selectedAcara:', selectedAcara);
      console.log('selectedKursi:', selectedKursi);
      // await bookKursi(selectedAcara, selectedKursi, 1);
      return;
    }
    try {
      await bookKursi(selectedAcara, selectedKursi, 1);
      handleRequestSuccess();
    } catch (error) {
      console.error('Error booking kursi:', error);
    }
  };


  return (
    <div className="App">
      <Header title="Booking" />
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

