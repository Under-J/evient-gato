export const MatchData = async (matchId: number) => {
  try {
    const response = await fetch(`http://localhost:8000/matches/${matchId}`);
    const data = await response.json();
    
    return data.data; 
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};