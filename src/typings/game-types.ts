import { ObjectID } from "bson";
import { GamePlayer } from "./player-types";
import { Document } from 'mongoose';

export interface LocalGame extends GameDocument {
    type: GameType.Local;
    players: GamePlayer[];
}
export interface OnlineGame extends GameDocument {
    type: GameType.Online;
    players: ObjectID[];
}
export enum GameType {
    Local,
    Online
}
interface GameDocument extends Document {
    name: string;
    type: GameType.Local | GameType.Online;
    playerNum: number;
}