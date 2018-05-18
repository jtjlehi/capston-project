import { Document } from "mongoose";

export enum PlayerType {
    Local,
    Online,
    Computer
}
export interface GamePlayer extends Document {
    name: string;
    type: PlayerType;
    score: number;
    currentTurn: boolean;
}