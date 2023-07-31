import { Form, Button } from 'react-bootstrap';
import { PlayersList } from '../components/get-players.tsx';
import { useState, useEffect } from 'react';
import { CreateMatch } from '../components/create-match.tsx';
import { useNavigate } from 'react-router-dom';
import { pagePaths } from './pagePaths.jsx';
import { PlayerType } from '../interfaces/player.js';

export const ChoosePlayers = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<PlayerType[]>([]);

  const handleClick = async (event: any) => {
    event.preventDefault()

    const select1 = event.target?.select1?.value ?? '';
    const select2 = event.target?.select2?.value ?? '';
    
    if (select1 !== '0' && select2 !== '0' && select1 !== select2) {
      const matchArgs = await CreateMatch(select1, select2);
      // console.log(matchArgs)
      navigate(pagePaths.matchWtihArgs(matchArgs));
    }
  }
  
  useEffect(() => {
    PlayersList().then((data: PlayerType[]) => {
      setPlayers(data);
    }).catch(error => {
      console.error('Error:', error);
      setPlayers([]);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br/>
      <h1>New match!</h1>
      <form onSubmit={handleClick}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <h1>X</h1>
        <Form.Select style={{ margin: '50px' }} id="select1" aria-label="Select option">
          <option value="0">Choose player</option>
          {players.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
        <h1>VS</h1>
        <Form.Select style={{ margin: '50px' }} id="select2" aria-label="Select option">
          <option value="0">Choose player</option>
          {players.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
        <h1>O</h1>
        <br />
      </div>
      <Button variant="success" type="submit">
        Start new game
      </Button>
      </form>
    </div>
  );
};
