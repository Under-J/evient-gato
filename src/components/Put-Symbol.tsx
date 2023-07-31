function PutSymbol(matchId: number, cellId: number, playerId: string) {
  fetch(`http://localhost:8000/match/player-move/${matchId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "player_id": playerId,
      "cell_id": cellId
    })
  })
    .catch(error => {
      console.error('Error al actualizar la celda: ', error);
    });
}

export default PutSymbol;