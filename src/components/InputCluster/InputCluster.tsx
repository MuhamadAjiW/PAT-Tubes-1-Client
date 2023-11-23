import { useState } from 'react';
import { useCookies } from 'react-cookie';

interface InputCluster{
    placeholder: string;
    buttonText: string;
    serverURL: string;
    onRequestSuccess: () => void;
    onClick: () => Promise<void>;
}

const InputCluster: React.FC<InputCluster> = ({ placeholder: title, buttonText, serverURL }) => {
    const [inputData, setInputData] = useState('');
    const [cookies, setCookie] = useCookies(['token']);
    const [logMessage, setLogMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
  
    if (cookies.token) {
        headers["Authorization"] = `Bearer ${cookies.token}`;
    }

    const sendData = () => {
        setLogMessage(null);
        setErrorMessage(null);

        const parsedInputData = parseInt(inputData, 10);

        if(isNaN(parsedInputData)){
            setErrorMessage('Error: Input data must be a valid integer');
            return;
        }

        setLogMessage(`Fetching...`);
        fetch(serverURL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ inputData }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
                setLogMessage(`Success, server response: ${data}`);
            })
            .catch(error => {
                console.error("Request error", error);
                setLogMessage(null);
                setErrorMessage(`Error, server response: ${error.message}`);
            })
    }

    return(
        <div>
            <input
            type="text"
            placeholder={title}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            />
            <button onClick={sendData} className='ButtonGeneric' style={{marginLeft: "10px", padding: "3px 10px"}}>{buttonText}</button>
            {logMessage && <p style={{ color: 'green' }}>{logMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default InputCluster;