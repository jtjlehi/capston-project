import { PlayerType } from './player_type-enum';

export interface GamePlayer {
    name: string;
    type: PlayerType;
    score: number;
}