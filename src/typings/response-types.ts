import { GameType } from "./game-types";
import { GamePlayer } from "./player-types";

export interface NewGameResponseBody {
    name: string;
    type: GameType;
    playerNum: number;
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
export interface LocalPlayerResponse {
    status: number;
    body: {
        game: string;
        player: GamePlayer;
    } | ErrorMessage;
}