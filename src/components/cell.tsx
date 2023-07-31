import React, { useState } from 'react';
import { MatchType } from '../interfaces/match';

interface CellProps {
  cellId: number;
  symbol: string;
  onClick: (cellId: number, symbol: string) => void;
  turnSymbol: string;
  match: MatchType;
}

const Cell: React.FC<CellProps> = ({ cellId, symbol, onClick, turnSymbol, match }) => {
    const [text, setText] = useState<string>(symbol);

    const handleCellClick = () => {
        if (text === '' && match.active && !match.winner) {
          onClick(cellId, symbol);
          setText(turnSymbol);
        }
      }
      

    return (
        <div key={cellId} className="grid-item" onClick={handleCellClick}>
            {text}
        </div>
    );
};

export default Cell;
