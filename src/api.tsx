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
  