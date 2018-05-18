import { GameType } from "./game-types";

export interface CreateGameObj {
    name: string;
    type: GameType;
    playerCount: number;
}