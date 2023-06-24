export const apiPaths = {
  allMatches: 'http://localhost:8000/matches/',
  matchById: (id) => `http://localhost:8000//matches/${id}/`,
  match: 'http://localhost:8000/match/',
  allPlayer: 'http://localhost:8000//player/',
  playerById: (id) => `http://localhost:8000//players/${id}/`,
  allCells: 'http://localhost:8000//cells/',
  cellById: (id) => `http://localhost:8000//cells/${id}/`,
  playerMove: (id) => `http://localhost:8000//match/player-move/${id}/`,
};
