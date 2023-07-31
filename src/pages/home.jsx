import { pagePaths } from './pagePaths';
import { Button } from 'react-bootstrap';
import MatchesTable from '../components/MatchesTable.tsx';

export const Home = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <br />
        <h1>New match?</h1>
        <br/>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <Button href={pagePaths.choosePlayers}variant='success'>New game</Button>
        </div>
      </div>
      <br/>
      <h1>Matches History:</h1>
      <br/>
      <MatchesTable />
    </div>
      )};
