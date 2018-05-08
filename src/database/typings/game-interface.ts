import { GamePlayer } from './game_player-interface';
import { GameType } from './game_type-enum';

export interface Game {
    name: string;
    type: GameType;
    players: GamePlayer[];
}
