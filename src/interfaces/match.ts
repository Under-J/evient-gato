import { PlayerType} from "./player";
import { CellType } from "./cell";

export interface MatchType {
    id?: number;
    player_1?: PlayerType;
    player_2?: PlayerType;
    updated_data?: string;
    active?: boolean;
    is_draw?: boolean;
    turn?: string;
    symbol?: string;
    winner?: number;
    cells?: CellType[];
  }
  