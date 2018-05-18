import { ObjectID } from "bson";
import { GamePlayer } from "./player-types";
import { Document } from 'mongoose';

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
export enum GameType {
    Local,
    Online
}