function PutWinner(matchId: number, playerId: number, isDraw: boolean) {
  if (isDraw) {
    fetch(`http://localhost:8000/matches/${matchId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "is_draw": true,
        "active": false
      })
    })
      .catch(error => {
        console.error('Error al actualizar al empatar: ', error);
      });
  } else {
    fetch(`http://localhost:8000/match/winner/${matchId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "winner_id": playerId
      })
    })
      .catch(error => {
        console.error('Error al actualizar al ganador: ', error);
      });
  }
}

export default PutWinner;
