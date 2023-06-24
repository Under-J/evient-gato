import { useParams } from 'react-router-dom';

export const Match = () => {
  let { matchId } = useParams();
  return (
    <div>
      <p>Match {matchId}</p>
    </div>
  );
};
