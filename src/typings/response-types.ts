import { GameType } from "./game-types";

export interface NewGameResponseBody {
    name: string;
    type: GameType;
    players: Array<object> | Array<never>;
}
export interface NewGameResponse {
    status: number;
    body: NewGameResponseBody | ErrorMessage;
}
export interface ErrorMessage {
    errorCode: number;
    message: string;
}