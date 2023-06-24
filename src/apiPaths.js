const apiPaths = {
  allMatches: '/matches/',
  match: (id) => `/matches/${id}/`,
  allPlayer: '/player/',
  player: (id) => `/players/${id}/`,
  allCells: '/cells/',
  cell: (id) => `/cells/${id}/`,
  playerMove: (id) => `/match/player-move/${id}/`,
};

export default apiPaths;
