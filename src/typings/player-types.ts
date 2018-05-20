import { Document } from "mongoose";

export enum PlayerType {
    Local,
    Online,
    Computer
}
export interface GamePlayerDoc extends Document, GamePlayer {
}
export interface GamePlayer {
    name: string;
    type: PlayerType;
    score: number;
    currentTurn: boolean;
}