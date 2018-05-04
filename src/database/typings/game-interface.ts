import { GamePlayer } from './game_player-interface';

export interface Game {
    name: string;
    type: string;
    players: GamePlayer[];
}
