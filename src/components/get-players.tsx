import { PlayerType } from "../interfaces/player";

export const PlayersList = (playerId?: number): Promise<PlayerType[]> => {
  if (!playerId) {
    return fetch('http://localhost:8000/players/')
      .then(response => response.json())
      .then(data => {
        return Array.isArray(data) ? data : [];
      })
      .catch(error => {
        console.error('Error:', error);
        return [];
      });
  } else {
    return fetch(`http://localhost:8000/players/${playerId}/`)
    .then(response => response.json())
    .then(data => {
      return Array.isArray(data) ? data : [];
    })
    .catch(error => {
      console.error('Error:', error);
      return [];
    });
  }
}
