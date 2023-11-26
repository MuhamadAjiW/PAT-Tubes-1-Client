// InputCluster.tsx
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import React from 'react';

interface InputClusterProps {
  buttonText: string;
  serverURL: string;
  onRequestSuccess: () => void;
  onClick: () => Promise<void>;
  acaraList: number[];
  selectedAcara: number | null;
  onSelectAcara: (acara: number | null) => void;
  kursiList: number[];
  selectedKursi: number | null;
  onSelectKursi: (kursi: number | null) => void;
}

const InputCluster: React.FC<InputClusterProps> = ({
  buttonText,
  serverURL,
  onRequestSuccess,
  onClick,
  acaraList,
  selectedAcara,
  onSelectAcara,
  kursiList,
  selectedKursi,
  onSelectKursi,
}) => {
  const [inputData, setInputData] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
  const [loading, setLoading] = useState(false);
  const [logMessage, setLogMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (cookies.token) {
    headers["Authorization"] = `Bearer ${cookies.token}`;
  }

  const sendData = async () => {
    setLogMessage(null);
    setErrorMessage(null);
    setLoading(true);
  
    try {
      await onClick(); 
      onRequestSuccess(); 
      setLogMessage('Success'); 
    } catch (error: any) {
      console.error('Request error', error);
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <select
        value={selectedAcara || ''}
        onChange={(e) => onSelectAcara(parseInt(e.target.value) || null)}
      >
        <option value="" disabled>Select Acara</option>
        {acaraList.map((acara) => (
          <option key={acara} value={acara}>{acara}</option>
        ))}
      </select>

      <select
        value={selectedKursi || ''}
        onChange={(e) => onSelectKursi(parseInt(e.target.value) || null)}
      >
        <option value="" disabled>Select Kursi</option>
        {kursiList.map((kursi) => (
          <option key={kursi} value={kursi}>{kursi}</option>
        ))}
      </select>

      <button
        onClick={sendData}
        className={`ButtonGeneric ${loading ? 'disabled' : ''}`}
        style={{ marginLeft: '10px', padding: '3px 10px' }}
        disabled={loading}
      >
        {loading ? 'Fetching...' : buttonText}
      </button>
      {logMessage && <p style={{ color: 'green' }}>{logMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default InputCluster;
