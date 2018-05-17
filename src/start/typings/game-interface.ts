import { GamePlayer } from './game_player-interface';
import { GameType } from './game_type-enum';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface LocalGame extends Document {
    name: string;
    type: GameType.Local;
    players: GamePlayer[];
}
export interface OnlineGame extends Document {
    name: string;
    type: GameType.Online;
    players: ObjectID[];
}