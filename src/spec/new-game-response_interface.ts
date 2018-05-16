import { GameType } from "../start/typings/game_type-enum";

export interface NewGameResponse {
    status: number;
    body: {
        name: string;
        type: GameType;
        players: Array<object> | Array<never>;
    };
}