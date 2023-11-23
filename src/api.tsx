// tugas-besar-pat-client/src/api.ts

export async function bookKursi(acaraId: number, kursiId: number, userId: number): Promise<any> {
    const apiUrl = 'http://localhost:3100/api/book-kursi'; 
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ acaraId, kursiId, userId }),
    });
  
    if (!response.ok) {
      throw new Error(`Error booking kursi: ${response.statusText}`);
    }
  
    return response.json();
  }

  export async function getAcaraList(): Promise<string[]> {
    const apiUrl = 'http://localhost:3100/api/acara-list';
  
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching acara list: ${response.statusText}`);
    }
  
    return response.json();
  }
  
  export async function getKursiList(): Promise<number[]> {
    const apiUrl = 'http://localhost:3100/api/kursi-list';
  
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching kursi list: ${response.statusText}`);
    }
  
    return response.json();
  }
  