import { Schema, Model, model, connect, Mongoose, disconnect, DocumentQuery, SchemaTypeOpts } from "mongoose";
import { ObjectID } from "mongodb";

import { GameType, LocalGame, OnlineGame } from "../typings/game-types";
import { GamePlayer, PlayerType } from "./../typings/player-types"
import { CreateGameObj } from "../typings/requests-types";
import { GameModels } from "./game-model";
import { NewGameResponseBody } from "../typings/response-types";

export class GameDB {
    // model type declaration
    private _connect = async (): Promise<Mongoose> => {
        return connect('mongodb://localhost/game');
    }
    // add game methods
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
                newGame = await GameModels.localGame.create(createObj);
            } else if (createGameObj.type === GameType.Online) {
                newGame = await GameModels.onlineGame.create(createObj);
            } else throw new Error("property 'type' must be either 0 or 1");
            return newGame;
        } catch (error) {
            if (error.errors && error.errors.playerNum) {
                throw new Error(error.errors.playerNum.message);
            } if (error.errors && error.errors.name) {
                throw new Error(error.errors.name.message);
            } throw error;
        }
    }
    // add local-game player methods
    public addLocalPlayer = async (game: string, playerName: string): Promise<GamePlayer> => {
        try {
            this._connect();
            let newPlayer = new GameModels.player({name: playerName});
            // find game
            let gameMatch: LocalGame = await this._findGame(game);
            let addPlayer: (
                playerName: string
            ) => Promise<GamePlayer[]> = await this._checkPlayer(gameMatch);
            // check player name and add it to the player
            let players: GamePlayer[] = await addPlayer(playerName);
            // update and save the game
            const savedObj = await gameMatch.update({players: players});
            disconnect();
            return {
                name: newPlayer.name,
                score: newPlayer.score,
                type: newPlayer.type,
                currentTurn: newPlayer.currentTurn
            }
        } catch (err) {
            throw err;
        }
    }
    private _findGame = async (game: string): Promise<LocalGame> => {
        try {
            let gameMatches: LocalGame[] = await GameModels.localGame.find({name: game});
            if (gameMatches.length === 0) throw new Error('there is no game with that name');
            return gameMatches[0];
        } catch(err) {
            throw err;
        }
    }
    private _checkPlayer = async (
        gameMatch: LocalGame
    ) => async (
        playerName: string
    ): Promise<GamePlayer[]> =>{
        try {
            // define players
            let players: GamePlayer[] = gameMatch.players;
            if (players.length === gameMatch.playerNum)
                throw new Error('You cannot add more players then the player count');
            players.forEach(existingPlayer => {
                if (existingPlayer.name === playerName) 
                    throw new Error('You cannot add two players with the same name');
            });
            // create new player
            let newPlayer = new GameModels.player({name: playerName});
            // add player to existing players
            players.push(newPlayer);
            return players;
        } catch(err) {
            throw err;
        }
    }
}