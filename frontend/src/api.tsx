// tugas-besar-pat-client/src/api.ts

export async function bookKursi(acaraId: number, kursiId: number, userId: number, email: string): Promise<any> {
    const apiUrl = 'http://localhost:3100/api/book'; 

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, userId, acaraId, kursiId }),
    });

    if (!response.ok) {
      throw new Error(`Error booking kursi: ${response.statusText}`);
    }

    return response.json();
  }

  export async function getAcaraList(): Promise<number[]> {
    const apiUrl = 'http://localhost:3100/api/acara';
  
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    const responseBody = await response.json();
  
    return responseBody.data;
  }
  
  export async function getKursiList(acaraId: number): Promise<number[]> {
    const apiUrl = `http://localhost:3100/api/kursi?acaraId=${acaraId}`;
  
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    const responseBody = await response.json();
  
    return responseBody.data;
  }
  