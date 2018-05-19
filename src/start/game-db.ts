import { Schema, Model, model, connect, Mongoose } from "mongoose";
import { ObjectID } from "mongodb";

import { GameType, LocalGame, OnlineGame } from "../typings/game-types";
import { GamePlayer, PlayerType } from "./../typings/player-types"
import { CreateGameObj } from "../typings/requests-types";

export class GameDB {
    private _objectId = Schema.Types.ObjectId;
    private _playerTypeValidator = (value: number): boolean => {
        return value === PlayerType.Computer || value === PlayerType.Local || value === PlayerType.Online;
    }
    private _playerSchema: Schema = new Schema({
        name: String,
        score: Number,
        currentTurn: Boolean,
        type: {
            type: String,
            validate: {
                validator: this._playerTypeValidator,
                msg: 'Invalid player type'
            }
        }
    });
    private _onlineGameSchema: Schema = new Schema({
        name: String,
        players: [this._objectId]
    });
    private _localGameSchema: Schema = new Schema({
        name: String,
        player: [this._playerSchema]
    });
    public playerModel: Model<GamePlayer>;
    public onlineGame: Model<OnlineGame>;
    public localGame: Model<LocalGame>;
    constructor() {
        this.playerModel = model<GamePlayer>('LocalPlayer', this._playerSchema, 'LocalPlayers');
        this.onlineGame = model<OnlineGame>('OnlineGame', this._onlineGameSchema, 'OnlineGames');
        this.localGame = model<LocalGame>('LocalGame', this._localGameSchema, 'LocalGames');
    }
    private _connect = async (): Promise<Mongoose> => {
        return connect('mongodb://localhost/game');
    }
    public saveOnlineGame = async (
        createGameObj: CreateGameObj
    ): Promise<any> => {
        console.log('in the db online saver');
        return true;
    }
    public saveLocalGame = async (
        createGameObj: CreateGameObj
    ): Promise<any> => {
        console.log('in the db local saver');
        return true;
    }

}