import { Schema, Model, model, SchemaTypeOpts } from "mongoose";
import { GamePlayer, PlayerType, GamePlayerDoc } from "../typings/player-types";
import { GameType, OnlineGame, LocalGame } from "../typings/game-types";

export class GameModels {
    // object id interface
    private _objectId = Schema.Types.ObjectId;
    // model type declaration
    public player: Model<GamePlayerDoc>;
    public onlineGame: Model<OnlineGame>;
    public localGame: Model<LocalGame>;
    // validators
    private _playerTypeValidator = (value: number): boolean => {
        return value === PlayerType.Computer || value === PlayerType.Local || value === PlayerType.Online;
    }
    private _uniqueGameNameValidator = (gameType: GameType): SchemaTypeOpts.AsyncValidateFn<string> => {
        let nameMatch: LocalGame[] | OnlineGame[];
        if (gameType === GameType.Local) {
            return async (
                value: string,
                done: (result: boolean) => void
            ) => {
                nameMatch = await this.localGame.find({name: value});
                return nameMatch.length === 0;
            }
        } else if (gameType === GameType.Online) {
            return async (
                value: string,
                done: (result: boolean) => void
            ) => {
                nameMatch = await this.onlineGame.find({name: value});
                return nameMatch.length === 0;
            }
        } else return async (value: string) => false;
    }
    // Schemas
    private _playerSchema: Schema = new Schema({
        name: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            default: 0
        },
        currentTurn: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            validate: {
                validator: this._playerTypeValidator,
                msg: 'Invalid player type'
            }
        }
    });
    private _onlineGameSchema: Schema = new Schema({
        name: {
            type: String,
            required: true,
            validate : {
                isAsync: true,
                validator: this._uniqueGameNameValidator(GameType.Online),
                msg: 'Online game with that name is in progress already'
            }
        },
        players: {
            type: [this._objectId],
            default: []
        },
        playerNum: {
            type: Number,
            min: [2, 'cannot have less then 2 players'],
            max: [6, 'cannot have more then 6 players'],
            required: true
        }
    });
    private _localGameSchema: Schema = new Schema({
        name: {
            type: String,
            required: true,
            validate : {
                isAsync: true,
                validator: this._uniqueGameNameValidator(GameType.Local),
                msg: 'Local game with that name is in progress already'
            }
        },
        players: {
            type: [this._playerSchema],
            default: []
        },
        playerNum: {
            type: Number,
            min: [2, 'cannot have less then 2 players'],
            max: [6, 'cannot have more then 6 players'],
            required: true
        }
    });
    constructor() {
        this.player = model<GamePlayerDoc>('LocalPlayer', this._playerSchema, 'LocalPlayers');
        this.onlineGame =  model<OnlineGame>('OnlineGame', this._onlineGameSchema, 'OnlineGames');
        this.localGame = model<LocalGame>('LocalGame', this._localGameSchema, 'LocalGames');
    }
}