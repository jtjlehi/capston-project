import { GamePlayer, PlayerType } from "../typings/player-types";

export class Player implements GamePlayer {
    name: string;
    type: PlayerType;
    score: number;
    currentTurn: boolean;
    constructor(name: string, type?: PlayerType) {
        this.name = name;
        this.type = type ? type : PlayerType.Local;
        this.score = 0;
        this.currentTurn = false;
    }
}