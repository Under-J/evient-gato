import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './grid.css';
import PutSymbol from '../components/Put-Symbol.tsx';
import PutWinner from '../components/Put-Winner.tsx';
import { MatchData } from '../components/get-match.tsx';
import Cell from '../components/cell.tsx';
import { MatchType } from '../interfaces/match';

export const Match = () => {
  let matchId = Number(useParams().matchId);

  const [match, setMatch] = useState<MatchType | null>(null);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [init, setInit] = useState(0);
  
  useEffect(() => {
    MatchData(matchId)
      .then(data => {
        setMatch(data);
      }).catch(error => {
        console.error('Error:', error);
        setMatch(null);
      });
  }, [matchId]);

  if (match === null) {
    return <div>Loading...</div>;
  }

  // console.log(match.cells)

  const handleClick = (matchId: number, cellId: number, symbolId: string) => {
    if (match && match.cells) {
      const cellIndex = match.cells.findIndex((cell) => Number(cell.id) === Number(cellId));
      if (cellIndex !== -1) {
        let clickedCell = match.cells[cellIndex];
        clickedCell.symbol = match.symbol;

        PutSymbol(matchId, cellId, match.turn ? match.turn : '');

        setMatch(prevMatch => {
          if (prevMatch && prevMatch.cells) {
            return {
              ...prevMatch,
              cells: [
                ...prevMatch.cells.slice(0, cellIndex),
                clickedCell,
                ...prevMatch.cells.slice(cellIndex + 1),
              ],
              symbol: prevMatch.symbol === 'X' ? 'O' : 'X',
              turn: prevMatch.turn === prevMatch.player_1?.id ? String(prevMatch.player_2?.id) : String(prevMatch.player_1?.id),
            };
          } else {
            return prevMatch;
          }
        });
                

        setPlayerTurn(match.turn === match.player_1?.id ? String(match.player_2?.id) : String(match.player_1?.id));

        checkVictory();
      }
    }
  };

  const checkVictory = () => {
    if (match && match.cells) { // Add a check here
      const cells = match.cells;

    const match3 = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // row
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // col
      [0, 4, 8], [2, 4, 6] // diag
    ];

    if (cells!.every((cell) => cell.symbol !== '') && !match.winner && !match.is_draw) {
      PutWinner(matchId, Number(match.turn), true);

      setMatch(prevMatch => ({
        ...prevMatch,
        is_draw: true,
        active: false
      }));
    }

    for (let combination of match3) {
      const [a, b, c] = combination;
      if (
        cells?.[a]?.symbol && cells?.[b]?.symbol && cells?.[c]?.symbol &&
        cells[a].symbol === cells[b].symbol &&
        cells[b].symbol === cells[c].symbol &&
        cells[a].symbol !== ''
      ) {
        if (!match?.winner) { 
          PutWinner(matchId, Number(match.turn), false);
  
          setMatch(prevMatch => ({
            ...prevMatch!,
            winner: Number(match.turn),
            active: false
          }));
        }
      }
    }
  }
  };

  const setInitTurn = () => {
    setPlayerTurn(String(match.turn));
  };

  if (!init) {
    checkVictory();
    setInitTurn();
    setInit(1);
  }

  // console.log(match.winner + " p1 " + match.player_1.id);
  return (
    <div>
      <p>Match {matchId}</p>
      <div style={{ textAlign: 'center' }}>
        <h3>
          <span>
            X {match.player_1?.name}
          </span>
          {' VS '}
          <span>
            {match.player_2?.name} O
          </span>
          <br />
          <div style={{ margin: '20px' }}>
            {match.is_draw ? (
              <div>DRAW!</div>
            ) : match.winner === match.player_1?.id ? (
              <div>{`${match.player_1?.name} is the winner!`}</div>
            ) : match.winner === match.player_2?.id ? (
              <div>{`${match.player_2?.name} is the winner!`}</div>
            ) : playerTurn === String(match.player_1?.id) ? (
              <div>{`${match.player_1?.name}'s turn`}</div>
            ) : playerTurn === String(match.player_2?.id) ? (
              <div>{`${match.player_2?.name}'s turn`}</div>
            ) : null}
          </div>
        </h3>
      </div>
      <div className='grid-container'>
        <div className="grid">
          {match.cells?.map((cell: any) => (
            <Cell
              key={cell.id}
              cellId={cell.id}
              symbol={cell.symbol}
              turnSymbol={String(match.symbol)}
              onClick={() => handleClick(matchId, cell.id, cell.symbol)}
              match={match}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
