import { Schema, Model, model, SchemaTypeOpts } from "mongoose";
import { GamePlayer, PlayerType, GamePlayerDoc } from "../typings/player-types";
import { GameType, OnlineGame, LocalGame } from "../typings/game-types";

export class GameModels {
    // object id interface
    private static _objectId = Schema.Types.ObjectId;
    private static _uniqueGameNameValidator = (gameType: GameType): SchemaTypeOpts.AsyncValidateFn<string> => {
        let nameMatch: LocalGame[] | OnlineGame[];
        if (gameType === GameType.Local) {
            return async (
                value: string,
                done: (result: boolean) => void
            ) => {
                nameMatch = await GameModels.localGame.find({name: value});
                return nameMatch.length === 0;
            }
        } else if (gameType === GameType.Online) {
            return async (
                value: string,
                done: (result: boolean) => void
            ) => {
                nameMatch = await GameModels.onlineGame.find({name: value});
                return nameMatch.length === 0;
            }
        } else return async (value: string) => false;
    }
    // Schemas
    private static _playerSchema: Schema = new Schema({
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
            type: Number,
            default: PlayerType.Local
        }
    });
    private static _onlineGameSchema: Schema = new Schema({
        name: {
            type: String,
            required: true,
            validate : {
                isAsync: true,
                validator: GameModels._uniqueGameNameValidator(GameType.Online),
                msg: 'Online game with that name is in progress already'
            }
        },
        players: {
            type: [GameModels._objectId],
            default: []
        },
        playerNum: {
            type: Number,
            min: [2, 'cannot have less then 2 players'],
            max: [6, 'cannot have more then 6 players'],
            required: true
        }
    });
    private static _localGameSchema: Schema = new Schema({
        name: {
            type: String,
            required: true,
            validate : {
                isAsync: true,
                validator: GameModels._uniqueGameNameValidator(GameType.Local),
                msg: 'Local game with that name is in progress already'
            }
        },
        players: {
            type: [GameModels._playerSchema],
            default: []
        },
        playerNum: {
            type: Number,
            min: [2, 'cannot have less then 2 players'],
            max: [6, 'cannot have more then 6 players'],
            required: true
        }
    });
    // model type declaration
    public static player: Model<GamePlayerDoc> = model<GamePlayerDoc>('LocalPlayer', GameModels._playerSchema, 'LocalPlayers');
    public static onlineGame: Model<OnlineGame> = model<OnlineGame>('OnlineGame', GameModels._onlineGameSchema, 'OnlineGames');
    public static localGame: Model<LocalGame> = model<LocalGame>('LocalGame', GameModels._localGameSchema, 'LocalGames');
}