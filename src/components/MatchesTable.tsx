import { MatchesList } from "./get-matches.tsx";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { PlayersList } from "./get-players.tsx";
import { MatchType } from "../interfaces/match.ts";
import { PlayerType } from "../interfaces/player.js";

function MatchesTable() {
  const [matches, setMatches] = useState<MatchType[]>([]);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    MatchesList().then(data => {
      setMatches(data);
    }).catch(error => {
      console.error('Error:', error);
      setMatches([]);
    });
  }, []);

  useEffect(() => {
    PlayersList().then((data: PlayerType[]) => {
      setPlayers(data);
    }).catch(error => {
      console.error('Error:', error);
      setPlayers([]);
    });
  }, []);

  if (matches.length === 0|| players.length === 0) {
    return <div>Loading...</div>;
  }

  const findPlayer = ( pId: number ) => {
    for(let player = 0; player<players.length; player ++)
    {
      if (players[player].id === pId) {
        return players[player].name
      }
    }
  }

  return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Player 1</th>
          <th>Player 2</th>
          <th>Last played</th>
          <th>Active</th>
          <th>Winner</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.player_1?.name}</td>
            <td>{item.player_2?.name}</td>
            <td>{item.updated_data}</td>
            <td>{item.active ? "Active" : "Inactive"}</td>
            <td>{item.is_draw ? "Draw" : (item.winner ? findPlayer(item.winner) : "-")}</td>
            <td><a href={"match/"+item.id}>{item.active ? "Play" : ""}</a></td>
          </tr>
        ))}
      </tbody>
    </Table>
    <p style={{ textAlign: 'center' }}>{matches.length===0 ? 'No matches, start one at "New game"' : ""}</p>
    </div>
  );
}

export default MatchesTable;
