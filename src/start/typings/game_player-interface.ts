import { PlayerType } from './player_type-enum';
import { Document } from 'mongoose';

export interface GamePlayer extends Document {
    name: string;
    type: PlayerType;
    score: number;
    currentTurn: boolean;
}