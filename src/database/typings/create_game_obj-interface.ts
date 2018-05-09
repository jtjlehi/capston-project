import { GameType } from "./game_type-enum";

export interface CreateGameObj {
    name: string;
    type: GameType;
    playerCount: number;
}