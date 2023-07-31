import { useState, useEffect } from "react";
import { CellType } from "../interfaces/cell";

function Cells(matchId: number) {
  const [cellsData, setCellsData] = useState<CellType[]>([]);

  const fetchCells = async () => {
    try {
      const response = await fetch('http://localhost:8000/cells/');
      const data = await response.json();
      const cells = Array.isArray(data) ? data : [];
      return cells;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const cellsData = await fetchCells();
      const filteredCells = cellsData.filter(cell => cell.match === matchId);
      setCellsData(filteredCells);
    };

    fetchData();
  }, [matchId]);

  return cellsData;
}

export default Cells;
