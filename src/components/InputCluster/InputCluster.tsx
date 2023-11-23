// InputCluster.tsx
import { useState } from 'react';
import { useCookies } from 'react-cookie';

interface InputCluster {
  placeholder: string;
  buttonText: string;
  serverURL: string;
  onRequestSuccess: () => void;
  onClick: () => Promise<void>;
}

const InputCluster: React.FC<InputCluster> = ({
  placeholder: title,
  buttonText,
  serverURL,
  onRequestSuccess,
  onClick,
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
  
    const parsedInputData = parseInt(inputData, 10);
  
    if (isNaN(parsedInputData)) {
      setErrorMessage('Error: Input data must be a valid integer');
      setLoading(false);
      return;
    }
  
    setLogMessage('Fetching...');
    
    try {
      await onClick(); 
      onRequestSuccess(); // Update state on success
      setLogMessage('Success'); // Update log message
    } catch (error: any) {
      console.error('Request error', error);
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder={title}
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
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