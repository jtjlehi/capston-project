import { Schema, Model, model } from "mongoose";
import { GameType } from "./typings/game_type-enum";
import { GamePlayer } from "./typings/game_player-interface"
import { PlayerType } from "./typings/player_type-enum";
import { ObjectID } from "mongodb";
import { LocalGame, OnlineGame } from "./typings/game-interface";

export class GameDB {
    private _playerSchema: Schema = new Schema({
        name: String,
        score: Number,
        currentTurn: Boolean,
        type: PlayerType
    });
    private _onlineGameSchema: Schema = new Schema({
        name: String,
        players: [ObjectID]
    });
    private _localGameSchema: Schema = new Schema({
        name: String,
        player: [this._playerSchema]
    });
    public playerModel: Model<GamePlayer>;
    public onlineGame: Model<OnlineGame>;
    public localGame: Model<LocalGame>
    constructor() {
        this.playerModel = model<GamePlayer>('GamePlayer', this._playerSchema);
        this.onlineGame = model<OnlineGame>('OnlineGame', this._onlineGameSchema);
        this.localGame = model<LocalGame>('LocalGame', this._localGameSchema);
    }
}