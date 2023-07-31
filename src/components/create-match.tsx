export const CreateMatch = async ( p1: number, p2: number) => {
  try {
    const url = 'http://localhost:8000/match/';
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_1_id: p1,
        player_2_id: p2,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('Match creado con éxito. ID:', data.match_id);
      return data.match_id;
    } else {
      console.log('Error al crear el match:', response.status);
    }
  } catch (error) {
    console.log('Error de conexión:', error);
  }

  return null;
};
