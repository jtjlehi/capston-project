import { Schema, Model, model, connect, Mongoose, disconnect, DocumentQuery, SchemaTypeOpts } from "mongoose";
import { ObjectID } from "mongodb";

import { GameType, LocalGame, OnlineGame } from "../typings/game-types";
import { GamePlayer, PlayerType } from "./../typings/player-types"
import { CreateGameObj } from "../typings/requests-types";
import { GameModels } from "./game-model";
import { NewGameResponseBody } from "../typings/response-types";

export class GameDB {
    // game schema class
    private _models: GameModels = new GameModels();
    // model type declaration
    private _connect = async (): Promise<Mongoose> => {
        return connect('mongodb://localhost/game');
    }
    public addGame = async (
        createGameObj: CreateGameObj
    ): Promise<NewGameResponseBody> => {
        try {
            await this._connect();
            const addedGame: LocalGame | OnlineGame = await this._saveNewGame(createGameObj);
            disconnect();
            return {
                name: addedGame.name,
                playerNum: addedGame.playerNum,
                players: addedGame.players,
                type: createGameObj.type
            }
        }
        catch (err) {
            throw err;
        }
    }
    private _saveNewGame = async (
        createGameObj: CreateGameObj
    ): Promise<OnlineGame | LocalGame> => {
        try {
            let createObj = {name: createGameObj.name, playerNum: createGameObj.playerCount};
            let newGame: LocalGame | OnlineGame;
            if (createGameObj.type === GameType.Local) {
                newGame = await this._models.localGame.create(createObj);
            } else if (createGameObj.type === GameType.Online) {
                newGame = await this._models.onlineGame.create(createObj);
            } else throw new Error("property 'type' must be either 0 or 1");
            return newGame;
        } catch (error) {
            if (error.errors && error.errors.playerNum) {
                throw new Error(error.errors.playerNum.message);
            } if (error.errors && error.errors.name) {
                throw new Error(error.errors.name.message);
            }
            throw error;
        }
    }

}