export const MatchesList = async () => {
  try {
    const response = await fetch('http://localhost:8000/matches/');
    const data = await response.json();
    const matches = Array.isArray(data.data) ? data.data : [];
    
    return matches;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};