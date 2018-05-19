import * as express from 'express';
import { CreateGameObj } from './../typings/requests-types';
import { GameType } from './../typings/game-types';
import { NewGameResponseBody, ErrorMessage } from './../typings/response-types';
import { GameDB } from './game-db';

export class CreateGame {
    private static _gameDB = new GameDB();
    public static post = async (
        req: express.Request,
        res: express.Response
    ): Promise<NewGameResponseBody | ErrorMessage> => {
        const body: CreateGameObj = req.body;
        let responseObj: NewGameResponseBody | ErrorMessage | undefined;
        let savedData: Promise<boolean>;
        if (!(body.name && (body.type || body.type === 0) && (body.playerCount || body.playerCount === 0))) {
            res.status(400);
            responseObj = {
                errorCode: 400,
                message: "Request body must contain name, playerCount, and body"
            }
        } else if (body.playerCount < 2) {
            res.status(406);
            responseObj = {
                errorCode: 406,
                message: "cannot have less then 2 players"
            }
        } else if (body.playerCount > 6) {
            res.status(406);
            responseObj = {
                errorCode: 406,
                message: "cannot have more then 6 players"
            }
        } else if (body.type === GameType.Online) {
            res.status(201);
            responseObj = {
                name: body.name,
                type: body.type,
                players: []
            }
            await CreateGame._handleOnlineGame(body);
        } else if (body.type === GameType.Local) {
            res.status(201);
            responseObj = {
                name: body.name,
                type: body.type,
                players: []
            }
            await CreateGame._handleLocalGame(body);
        } else {
            res.status(406);
            responseObj = {
                errorCode: 406,
                message: "property 'type' must be either 0 or 1"
            }
        }
        res.send(JSON.stringify(responseObj));
        return responseObj;
    }
    private static _handleOnlineGame = async (
        body: CreateGameObj
    ): Promise<void> => {
        await CreateGame._gameDB.saveOnlineGame(body);
        return;
    }
    private static _handleLocalGame = async (
        body: CreateGameObj
    ): Promise<void> => {
        await CreateGame._gameDB.saveLocalGame(body);
        return;
    }
}