import { Schema, Model, model, connect, Mongoose, disconnect, DocumentQuery, SchemaTypeOpts } from "mongoose";
import { ObjectID } from "mongodb";

import { GameType, LocalGame, OnlineGame } from "../typings/game-types";
import { GamePlayer, PlayerType } from "./../typings/player-types"
import { CreateGameObj } from "../typings/requests-types";
import { GameModels } from "./game-model";

export class GameDB {
    // game schema class
    private _models: GameModels = new GameModels();
    // model type declaration
    private _connect = async (): Promise<Mongoose> => {
        return connect('mongodb://localhost/game');
    }
    public saveGame = async (
        createGameObj: CreateGameObj
    ): Promise<any> => {
        try {
            await this._connect();
            const newGame: LocalGame | OnlineGame = await this._addGame(createGameObj);
            disconnect();
            return;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }
    private _addGame = async (
        createGameObj: CreateGameObj
    ): Promise<LocalGame | OnlineGame> => {
        let newGame: LocalGame | OnlineGame;
        // define which model to follow
        if (createGameObj.type === GameType.Local) {
            newGame = new this._models.localGame();
        } else if (createGameObj.type === GameType.Online) {
            newGame = new this._models.localGame();
        } else throw new Error('Invalid game type.');
        // give it name and playerNum
        newGame.name = createGameObj.name;
        newGame.playerNum = createGameObj.playerCount;
        console.log(newGame);
        return newGame;
    }

}