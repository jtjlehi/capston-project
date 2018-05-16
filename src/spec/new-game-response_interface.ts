import { GameType } from "../start/typings/game_type-enum";
import { ErrorMessage } from "./error-response_interface";

export interface NewGameResponseBody {
    name: string;
    type: GameType;
    players: Array<object> | Array<never>;
}

export interface NewGameResponse {
    status: number;
    body: NewGameResponseBody | ErrorMessage;
}